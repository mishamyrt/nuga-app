package main

import (
	"context"
	"encoding/json"
	"log"
	"nuga/pkg/color"
	"nuga/pkg/hid"
	"nuga/pkg/keyboard"
	"nuga/pkg/keyboard/effect"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// LightState represents keyboard light state.
type LightState struct {
	keyboard.Effects
	BacklightParams *keyboard.EffectParams
}

// App struct
type App struct {
	ctx    context.Context
	lights keyboard.Lights
	mode   OSMode
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	err := hid.Init()
	if err != nil {
		log.Panicf("Error while initializing HID: %v", err)
	}
	a.ctx = ctx
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) shutdown(_ context.Context) {
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
	var template keyboard.SimulationTemplate
	err = json.Unmarshal(content, &template)
	if err != nil {
		log.Printf("Error while parsing simulation template: %v", err)
	}
	a.lights = keyboard.OpenSimulation(template)
	return template.Name
}

// Disconnect keyboard.
func (a *App) Disconnect() {
	a.lights = nil
}

// Connect initiates connection and returns a keyboard name
func (a *App) Connect() string {
	if a.lights == nil {
		lights, err := keyboard.Open()
		if err != nil {
			return ""
		}
		name, err := lights.GetName()
		if err != nil || name != "NuPhy Halo75" {
			return ""
		}
		a.lights = lights
	}
	name, err := a.lights.GetName()
	if err != nil {
		return ""
	}
	return name
}

// GetPath returns current device path if connected
func (a *App) GetPath() string {
	name, err := a.lights.GetPath()
	if err != nil {
		return ""
	}
	return name
}

// GetModes returns keyboard modes
func (a *App) GetModes() *Modes {
	return &Modes{
		Backlight: &effect.Backlight,
		Sidelight: &effect.Sidelight,
		Halo:      &effect.Halo,
	}
}

// GetLightState returns current keyboard light state
func (a *App) GetLightState() (LightState, error) {
	var state LightState
	effects, err := a.lights.GetEffects()
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
	colors, err := a.lights.GetColors()
	if err != nil {
		return nil
	}
	return colors[24:]
}

// SetHalo sets halolight effect
func (a *App) SetHalo(mode, color, brightness, speed uint8) error {
	state, err := a.lights.GetEffects()
	if err != nil {
		return nil
	}
	state.Halo.Mode = effect.Halo.Find(mode)
	state.Halo.Params = keyboard.EffectParams{
		Color:      color,
		Brightness: brightness,
		Speed:      speed,
	}
	return a.lights.SetEffects(state)
}

// SetSidelight sets sidelight effect
func (a *App) SetSidelight(mode, color, brightness, speed uint8) error {
	state, err := a.lights.GetEffects()
	if err != nil {
		return nil
	}
	state.Sidelight.Mode = effect.Sidelight.Find(mode)
	state.Sidelight.Params = keyboard.EffectParams{
		Color:      color,
		Brightness: brightness,
		Speed:      speed,
	}
	return a.lights.SetEffects(state)
}

// SetBacklight sets backlight effect
func (a *App) SetBacklight(mode, color, brightness, speed uint8) error {
	state, err := a.lights.GetEffects()
	if err != nil {
		return nil
	}
	state.Backlight.Mode = effect.Backlight.Find(mode)
	if mode != 0 {
		fea := state.Backlight.Mode.Features
		if fea.Supports(effect.Speed) {
			err = state.Backlight.SetSpeed(speed)
			if err != nil {
				return err
			}
		}
		if fea.Supports(effect.SpecificColor) {
			err = state.Backlight.SetColor(color)
			if err != nil {
				return err
			}
		}
		err = state.Backlight.SetBrightness(brightness)
		if err != nil {
			return err
		}
	}

	return a.lights.SetEffects(state)
}

// SetMode sets keyboard OS mode
func (a *App) SetMode(m OSMode) {
	a.mode = m
}

// SetBacklightColor sets backlight color by mode and index
func (a *App) SetBacklightColor(m, i uint8, c color.RGB) {
	colors, err := a.lights.GetColors()
	if err != nil {
		return
	}
	if a.mode == Win {
		colors.SetWinBacklight(m, i, c)
	} else if a.mode == Mac {
		colors.SetMacBacklight(m, i, c)
	} else {
		colors.SetWinBacklight(m, i, c)
		colors.SetMacBacklight(m, i, c)
	}

	err = a.lights.SetColors(colors)
	if err != nil {
		log.Printf("Error on writing colors: %v", err)
	}
}
