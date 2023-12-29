package usecase

import (
	"context"
	"nuga/pkg/color"
	"nuga/pkg/light"
	"nuga/pkg/light/effect"
	"nuga_ui/internal/dto"
	"nuga_ui/internal/entity"
	"nuga_ui/internal/errors"
	"nuga_ui/internal/interfaces"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// LightsUsecase represents lights-related use case
type LightsUsecase struct {
	ctx  context.Context
	repo *interfaces.Repository
}

// OnStartup is a life-cycle hook that runs when app starts
func (l *LightsUsecase) OnStartup(ctx context.Context, repo *interfaces.Repository) error {
	l.repo = repo
	l.ctx = ctx
	return nil
}

// OnShutdown is a life-cycle hook that runs when app finishes
func (l *LightsUsecase) OnShutdown() error {
	return nil
}

// GetLightModes returns light modes
func (l *LightsUsecase) GetLightModes() dto.LightModes {
	return l.repo.Device.Get().LightDomains
}

// GetLightState returns lights state
func (l *LightsUsecase) GetLightState() (dto.LightState, error) {
	var state dto.LightState
	effects, err := l.repo.Device.Get().Light.GetEffects()
	if err != nil {
		return state, err
	}
	state.Backlight = effects.Backlight
	state.Halo = effects.Halo
	state.Sidelight = effects.Sidelight
	state.BacklightParams = effects.Backlight.CurrentParams()
	return state, nil
}

// GetBacklightColors returns backlight colors
func (l *LightsUsecase) GetBacklightColors() (dto.BacklightColors, error) {
	dev := l.repo.Device.Get()
	config := l.repo.Settings.GetMode()
	colors, err := dev.Light.GetColors()
	if err != nil {
		return nil, err
	}
	if config.IndividualSettings && config.OSMode == entity.WindowsOSMode {
		return colors.GetWin(), nil
	}
	return colors.GetMac(), nil
}

// SetLightState updates lights state
func (l *LightsUsecase) SetLightState(r dto.LightStateRequest) error {
	dev := l.repo.Device.Get()
	state, err := dev.Light.GetEffects()
	if err != nil {
		return err
	}
	err = l.applyBacklightState(&state.Backlight, r.Backlight)
	if err != nil {
		return err
	}
	err = l.applyMiscState(&state.Sidelight, r.Sidelight, effect.Sidelight)
	if err != nil {
		return err
	}
	err = l.applyMiscState(&state.Halo, r.Halo, effect.Halo)
	if err != nil {
		return err
	}
	return dev.Light.SetEffects(state)
}

// SetBacklightColor sets backlight color by mode and index
func (l *LightsUsecase) SetBacklightColor(mode, index uint8, color color.RGB) error {
	dev := l.repo.Device.Get()
	config := l.repo.Settings.GetMode()
	colors, err := dev.Light.GetColors()
	if err != nil {
		return err
	}
	if config.IndividualSettings {
		if config.OSMode == entity.MacOSMode {
			colors.SetMacBacklight(mode, index, color)
		} else {
			colors.SetWinBacklight(mode, index, color)
		}
	} else {
		colors.SetWinBacklight(mode, index, color)
		colors.SetMacBacklight(mode, index, color)
	}
	return dev.Light.SetColors(colors)
}

func (l *LightsUsecase) SavePreset() error {
	dev := l.repo.Device.Get()
	state, err := dev.Light.GetEffects()
	if err != nil {
		return err
	}
	if err != nil {
		return err
	}
	colors, err := dev.Light.GetColors()
	if err != nil {
		return err
	}
	deviceName := dev.Name
	path, err := runtime.SaveFileDialog(l.ctx, runtime.SaveDialogOptions{
		Title:           "Save lights preset",
		DefaultFilename: deviceName + ".lights.json",
	})
	if err != nil {
		return err
	}
	return l.repo.Preset.SaveLightsPreset(path, dto.LightsPreset{
		Name:   deviceName,
		Colors: colors.Slice(),
		State:  state,
	})
}

func (l *LightsUsecase) LoadPreset() error {
	var preset dto.LightsPreset
	path, err := runtime.OpenFileDialog(l.ctx, runtime.OpenDialogOptions{
		Title: "Open lights preset",
	})
	if err != nil {
		return err
	}
	preset, err = l.repo.Preset.ReadLightsPreset(path)
	if err != nil {
		return err
	}
	dev := l.repo.Device.Get()
	if preset.Name != dev.Name {
		return errors.ErrPresetWrongDevice
	}

	colorState := light.ColorsFromSlice(preset.Colors)
	err = dev.Light.SetColors(colorState)
	if err != nil {
		return err
	}
	err = dev.Light.SetEffects(preset.State)
	if err != nil {
		return err
	}
	return nil
}

func (l *LightsUsecase) applyBacklightState(b *light.BacklightEffect, r dto.LightDomainRequest) error {
	b.Mode = effect.Backlight.Find(r.Mode)
	if b.Mode == nil {
		b.Mode = &effect.BacklightOff
	}
	if b.Mode.Code == 0 {
		return nil
	}
	fea := b.Mode.Features
	if fea.IsSet(effect.Speed) {
		err := b.SetSpeed(r.Speed)
		if err != nil {
			return err
		}
	}
	if fea.IsSet(effect.SpecificColor) {
		err := b.SetColor(r.Color)
		if err != nil {
			return err
		}
	}
	err := b.SetBrightness(r.Brightness)
	if err != nil {
		return err
	}
	return nil
}

func (l *LightsUsecase) applyMiscState(
	e *light.MiscEffect,
	r dto.LightDomainRequest,
	d effect.Domain,
) error {
	e.Mode = d.Find(r.Mode)
	if e.Mode == nil {
		e.Mode = &effect.SidelightOff
	}
	if e.Mode.Code == 0 {
		r.Speed = 0
		e.Color = 0
		return nil
	}
	if e.Mode.Features.IsSet(effect.Speed) {
		e.Speed = r.Speed
	} else {
		r.Speed = 0
	}
	if e.Mode.Features.IsSet(effect.SpecificColor) {
		e.Color = r.Color
	} else {
		e.Color = 0
	}
	e.Brightness = r.Brightness
	return nil
}
