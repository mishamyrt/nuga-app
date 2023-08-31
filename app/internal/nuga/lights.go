package nuga

import (
	"log"
	"nuga/pkg/color"
	"nuga/pkg/light"
	"nuga/pkg/light/effect"
)

// GetLightModes returns keyboard light modes by domains
func (a *App) GetLightModes() []effect.Domain {
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

// SetLightState applies new state to keyboard
func (a *App) SetLightState(request LightStateRequest) error {
	state, err := a.dev.Light.GetEffects()
	if err != nil {
		return err
	}
	err = applyBacklightState(&state.Backlight, request.Backlight)
	if err != nil {
		return err
	}
	err = applyMiscState(&state.Sidelight, request.Sidelight, effect.Sidelight)
	if err != nil {
		return err
	}
	err = applyMiscState(&state.Halo, request.Halo, effect.Halo)
	if err != nil {
		return err
	}
	return a.dev.Light.SetEffects(state)
}

// GetBacklightColors returns backlight colors for current mode
func (a *App) GetBacklightColors() [][7]color.RGB {
	colors, err := a.dev.Light.GetColors()
	if err != nil {
		return nil
	}
	var startOffset int
	switch a.mode {
	case Win:
		startOffset = 0
	case Mac:
	case Both:
		startOffset = 24
	}
	return colors[startOffset : startOffset+24]
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

func applyBacklightState(b *light.BacklightEffect, s LightDomainRequest) error {
	b.Mode = effect.Backlight.Find(s.Mode)
	if b.Mode == nil {
		b.Mode = &effect.BacklightOff
	}
	if b.Mode.Code == 0 {
		return nil
	}
	fea := b.Mode.Features
	if fea.IsSet(effect.Speed) {
		err := b.SetSpeed(s.Speed)
		if err != nil {
			return err
		}
	}
	if fea.IsSet(effect.SpecificColor) {
		err := b.SetColor(s.Color)
		if err != nil {
			return err
		}
	}
	err := b.SetBrightness(s.Brightness)
	if err != nil {
		return err
	}
	return nil
}

func applyMiscState(e *light.MiscEffect, s LightDomainRequest, d effect.Domain) error {
	e.Mode = d.Find(s.Mode)
	if e.Mode == nil {
		e.Mode = &effect.SidelightOff
	}
	if e.Mode.Code == 0 {
		return nil
	}
	if e.Mode.Features.IsSet(effect.Speed) {
		e.Speed = s.Speed
	} else {
		s.Speed = 0
	}
	if e.Mode.Features.IsSet(effect.SpecificColor) {
		e.Color = s.Color
	} else {
		e.Color = 0
	}
	e.Brightness = s.Brightness
	return nil
}
