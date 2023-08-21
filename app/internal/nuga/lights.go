package nuga

import (
	"log"
	"nuga/pkg/color"
	"nuga/pkg/light"
	"nuga/pkg/light/effect"
)

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
