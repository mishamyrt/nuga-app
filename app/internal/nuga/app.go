// Package nuga contains application backend
package nuga

import (
	"context"
	"encoding/json"
	"log"
	"nuga/pkg/color"
	"nuga/pkg/device"
	"nuga/pkg/hid"
	"nuga/pkg/light"
	"nuga/pkg/light/effect"
	"nuga_ui/internal/updates"
	"os"

	go_runtime "runtime"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx  context.Context
	dev  *device.Device
	mode OSMode
}

// OnStartup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) OnStartup(ctx context.Context) {
	err := hid.Init()
	if err != nil {
		log.Panicf("Error while initializing HID: %v", err)
	}
	a.ctx = ctx
}

func (a *App) GetOS() string {
	os := go_runtime.GOOS
	if os == "darwin" {
		return "mac"
	} else {
		return os
	}
}

// CheckUpdates starts update check in background
func (a *App) CheckUpdates() {
	go func() {
		updater := updates.GitHubUpdater{FullName: "mishamyrt/Nuga"}
		latest, err := updater.Latest()
		if err != nil || len(latest) == 0 {
			return
		}
		if AppVersion != latest {
			runtime.EventsEmit(a.ctx, "update", updater.ReleaseURL(latest))
		}
	}()
}

// OnShutdown is called when the app closes
func (a *App) OnShutdown(_ context.Context) {
	err := hid.Exit()
	if err != nil {
		log.Panicf("Error while closing HID: %v", err)
	}
}

// GetVersion returns current executable version
func (a *App) GetVersion() string {
	return AppVersion
}

// SimulateConnection initiates simulation start
func (a *App) SimulateConnection() string {
	path, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Nuga JSON dump",
				Pattern:     "*.json",
			},
		},
	})
	if err != nil {
		log.Printf("Error while opening simulation template: %v", err)
	}
	if path == "" {
		return ""
	}
	content, err := os.ReadFile(path)
	if err != nil {
		log.Printf("Error while reading simulation template: %v", err)
	}
	var template light.SimulationTemplate
	err = json.Unmarshal(content, &template)
	if err != nil {
		log.Printf("Error while parsing simulation template: %v", err)
	}
	a.dev, err = device.OpenSimulation(template)
	if err != nil {
		log.Printf("Error while loading simulation: %v", err)
	}
	return a.dev.Name
}

// Disconnect light.
func (a *App) Disconnect() {
	a.dev = nil
}

// Connect initiates connection and returns a keyboard name
func (a *App) Connect() string {
	var err error
	if a.dev == nil {
		a.dev, err = device.Open()
		if err != nil {
			return ""
		}
	}
	return a.dev.Name
}

// GetPath returns current device path
func (a *App) GetPath() string {
	return a.dev.Path
}

// GetFirmware returns current device firmware version
func (a *App) GetFirmware() string {
	return a.dev.Firmware
}

// GetLightDomains returns keyboard light domains
func (a *App) GetLightDomains() []effect.Domain {
	return a.dev.LightDomains
}

// GetLightState returns current keyboard light state
func (a *App) GetLightState() (LightState, error) {
	var state LightState
	effects, err := a.dev.Light.GetEffects()
	if err != nil {
		return state, err
	}
	state.Backlight = effects.Backlight
	state.Halo = effects.Halo
	state.Sidelight = effects.Sidelight
	state.BacklightParams = effects.Backlight.CurrentParams()
	return state, nil
}

// GetMacColors returns colors for mac modes
func (a *App) GetMacColors() [][7]color.RGB {
	log.Println("dev", a.dev.Light)
	colors, err := a.dev.Light.GetColors()
	if err != nil {
		return nil
	}
	return colors[24:]
}

// SetHalo sets halolight effect
func (a *App) SetHalo(mode, color, brightness, speed uint8) error {
	state, err := a.dev.Light.GetEffects()
	if err != nil {
		return err
	}
	state.Halo.Mode = effect.Halo.Find(mode)
	state.Halo.Params = light.EffectParams{
		Color:      color,
		Brightness: brightness,
		Speed:      speed,
	}
	return a.dev.Light.SetEffects(state)
}

// SetSidelight sets sidelight effect
func (a *App) SetSidelight(mode, color, brightness, speed uint8) error {
	state, err := a.dev.Light.GetEffects()
	if err != nil {
		return err
	}
	state.Sidelight.Mode = effect.Sidelight.Find(mode)
	state.Sidelight.Params = light.EffectParams{
		Color:      color,
		Brightness: brightness,
		Speed:      speed,
	}
	return a.dev.Light.SetEffects(state)
}

// SetBacklight sets backlight effect
func (a *App) SetBacklight(mode, color, brightness, speed uint8) error {
	state, err := a.dev.Light.GetEffects()
	if err != nil {
		return err
	}
	state.Backlight.Mode = effect.Backlight.Find(mode)
	if mode == 0 {
		return a.dev.Light.SetEffects(state)
	}

	fea := state.Backlight.Mode.Features
	if fea.IsSet(effect.Speed) {
		err = state.Backlight.SetSpeed(speed)
		if err != nil {
			return err
		}
	}
	if fea.IsSet(effect.SpecificColor) {
		err = state.Backlight.SetColor(color)
		if err != nil {
			return err
		}
	}
	err = state.Backlight.SetBrightness(brightness)
	if err != nil {
		return err
	}

	return a.dev.Light.SetEffects(state)
}

// SetMode sets keyboard OS mode
func (a *App) SetMode(m OSMode) {
	a.mode = m
}

// SetBacklightColor sets backlight color by mode and index
func (a *App) SetBacklightColor(m, i uint8, c color.RGB) {
	colors, err := a.dev.Light.GetColors()
	if err != nil {
		return
	}
	switch a.mode {
	case Win:
		colors.SetWinBacklight(m, i, c)
	case Mac:
		colors.SetMacBacklight(m, i, c)
	case Both:
		colors.SetWinBacklight(m, i, c)
		colors.SetMacBacklight(m, i, c)
	}

	err = a.dev.Light.SetColors(colors)
	if err != nil {
		log.Printf("Error on writing colors: %v", err)
	}
}

// NewApp creates a new application struct
func NewApp() *App {
	return &App{}
}
