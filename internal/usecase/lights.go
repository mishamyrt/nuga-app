package usecase

import (
	"context"
	"nuga_ui/internal/dto"
	"nuga_ui/internal/errors"
	"nuga_ui/internal/interfaces"

	"github.com/mishamyrt/nuga-lib"
	"github.com/mishamyrt/nuga-lib/light"
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
	dev := l.repo.Device.Get()
	var modes dto.LightModes = make([]light.Domain, 0)
	if dev.Capabilities.Has(nuga.BacklightCapability) {
		modes = append(modes, light.BacklightDomain)
	}
	if dev.Capabilities.Has(nuga.SidelightCapability) {
		modes = append(modes, light.SidelightDomain)
	}
	if dev.Capabilities.Has(nuga.HalolightCapability) {
		modes = append(modes, light.HaloDomain)
	}
	return modes
}

// GetLightState returns lights state
func (l *LightsUsecase) GetLightState() (dto.LightState, error) {
	var state dto.LightState
	effects, err := l.repo.Device.Get().Features.Light.GetEffects()
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
	colors, err := dev.Features.Light.GetBacklightColors()
	if err != nil {
		return nil, err
	}
	if config.IndividualSettings && config.OSMode == dto.WindowsOSMode {
		return colors.GetWin(), nil
	}
	return colors.GetMac(), nil
}

// SetLightState updates lights state
func (l *LightsUsecase) SetLightState(r dto.LightStateRequest) error {
	dev := l.repo.Device.Get()
	state, err := dev.Features.Light.GetEffects()
	if err != nil {
		return err
	}
	err = l.applyBacklightState(&state.Backlight, r.Backlight)
	if err != nil {
		return err
	}
	err = l.applyMiscState(&state.Sidelight, r.Sidelight, light.SidelightDomain)
	if err != nil {
		return err
	}
	err = l.applyMiscState(&state.Halo, r.Halo, light.HaloDomain)
	if err != nil {
		return err
	}
	return dev.Features.Light.SetEffects(state)
}

// SetBacklightColor sets backlight color by mode and index
func (l *LightsUsecase) SetBacklightColor(mode, index uint8, color light.RGB) error {
	dev := l.repo.Device.Get()
	config := l.repo.Settings.GetMode()
	colors, err := dev.Features.Light.GetBacklightColors()
	if err != nil {
		return err
	}
	if config.IndividualSettings {
		if config.OSMode == dto.MacOSMode {
			colors.SetMac(mode, index, &color)
		} else {
			colors.SetWin(mode, index, &color)
		}
	} else {
		colors.SetWin(mode, index, &color)
		colors.SetMac(mode, index, &color)
	}
	return dev.Features.Light.SetBacklightColors(colors)
}

// SavePreset initiates preset save process
func (l *LightsUsecase) SavePreset() error {
	dev := l.repo.Device.Get()
	state, err := dev.Features.Light.GetEffects()
	if err != nil {
		return err
	}
	if err != nil {
		return err
	}
	colors, err := dev.Features.Light.GetBacklightColors()
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

// LoadPreset initiates preset loading process
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

	colorState := light.BacklightColorsFromSlice(preset.Colors)
	err = dev.Features.Light.SetBacklightColors(colorState)
	if err != nil {
		return err
	}
	err = dev.Features.Light.SetEffects(preset.State)
	if err != nil {
		return err
	}
	return nil
}

func (l *LightsUsecase) applyBacklightState(b *light.BacklightEffect, r dto.LightDomainRequest) error {
	b.Mode = light.BacklightDomain.Find(r.Mode)
	if b.Mode == nil {
		b.Mode = &light.BacklightOff
	}
	if b.Mode.Code == 0 {
		return nil
	}
	fea := b.Mode.Features
	if fea.IsSet(light.Speed) {
		err := b.SetSpeed(r.Speed)
		if err != nil {
			return err
		}
	}
	if fea.IsSet(light.SpecificColor) {
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
	d light.Domain,
) error {
	e.Mode = d.Find(r.Mode)
	if e.Mode == nil {
		e.Mode = &light.SidelightOff
	}
	if e.Mode.Code == 0 {
		r.Speed = 0
		e.Color = 0
		return nil
	}
	if e.Mode.Features.IsSet(light.Speed) {
		e.Speed = r.Speed
	} else {
		r.Speed = 0
	}
	if e.Mode.Features.IsSet(light.SpecificColor) {
		e.Color = r.Color
	} else {
		e.Color = 0
	}
	e.Brightness = r.Brightness
	return nil
}
