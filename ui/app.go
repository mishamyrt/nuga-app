package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"nuga/pkg/color"
	"nuga/pkg/keyboard"
	"nuga/pkg/keyboard/effect"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Modes struct {
	Backlight *effect.Modes
	Sidelight *effect.Modes
	Halo      *effect.Modes
}

// App struct
type App struct {
	ctx    context.Context
	lights *keyboard.Lights
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

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
		log.Panicf("Error while opening simulation template: %v", err)
	}
	content, err := ioutil.ReadFile(path)
	if err != nil {
		log.Panicf("Error while reading simulation template: %v", err)
	}
	var template keyboard.SimulationTemplate
	err = json.Unmarshal(content, &template)
	if err != nil {
		log.Panicf("Error while parsing simulation template: %v", err)
	}
	a.lights = keyboard.OpenSimulation(template)
	return template.Name
}
// Connect returns a keyboard name
func (a *App) Connect() string {
	if a.lights == nil {
		lights, err := keyboard.Open()
		if err != nil {
			return ""
		}
		a.lights = &lights
	}
	name, err := a.lights.Handle.Device.GetProductStr()
	if err != nil {
		return ""
	}
	return name
}

// Connect returns a keyboard name
func (a *App) GetModes() *Modes {
	return &Modes{
		Backlight: &effect.Backlight,
		Sidelight: &effect.Sidelight,
		Halo:      &effect.Halo,
	}
}

// Connect returns a keyboard name
func (a *App) GetLightState() *keyboard.Effects {
	state, err := a.lights.GetEffects()
	if err != nil {
		return nil
	}
	return &state
}

// Connect returns a keyboard name
func (a *App) GetBacklightParams() *keyboard.EffectParams {
	state, err := a.lights.GetEffects()
	if err != nil {
		return nil
	}
	return state.Backlight.CurrentParams()
}

func (a *App) GetMacColors() [][7]color.RGB {
	colors, err := a.lights.GetColors()
	if err != nil {
		return nil
	}
	return colors[24:]
}

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

func (a *App) SetBacklight(mode, color, brightness, speed uint8) error {
	state, err := a.lights.GetEffects()
	if err != nil {
		return nil
	}
	state.Backlight.Mode = effect.Backlight.Find(mode)
	state.Backlight.SetColor(color)
	state.Backlight.SetBrightness(brightness)
	state.Backlight.SetSpeed(speed)
	return a.lights.SetEffects(state)
}
