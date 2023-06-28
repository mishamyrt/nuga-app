package keyboard

import "nuga/pkg/keyboard/effect"

type MiscEffect struct {
	Mode   *effect.Mode
	Params EffectParams
}

func (p *MiscEffect) SetBrightness(brightness uint8) error {
	if p.Mode.Code == 0 {
		return ErrLightsOff
	}
	if brightness > 4 {
		return ErrOutOfRange
	}
	p.Params.Brightness = brightness
	return nil
}

func (p *MiscEffect) SetSpeed(speed uint8) error {
	if p.Mode.Code == 0 {
		return ErrLightsOff
	}
	if !p.Mode.Features.Supports(effect.Speed) {
		return ErrNotSupported
	}
	if speed > 4 {
		return ErrOutOfRange
	}
	p.Params.Speed = speed
	return nil
}

func (p *MiscEffect) SetColor(color uint8) error {
	if !p.Mode.Features.Supports(effect.SpecificColor) {
		return ErrNotSupported
	}
	// 6, not 7, because the extra lights do not support random colors
	if color > 6 {
		return ErrOutOfRange
	}
	p.Params.Color = color
	return nil
}
