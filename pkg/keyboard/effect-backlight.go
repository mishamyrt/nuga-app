package keyboard

import "nuga/pkg/keyboard/effect"

type BacklightEffect struct {
	Mode   *effect.Mode
	Params []EffectParams
}

func (p *BacklightEffect) CurrentParams() *EffectParams {
	code := p.Mode.Code
	if code == 0 {
		return nil
	}
	return &p.Params[code-1]
}

func (p *BacklightEffect) SetBrightness(brightness uint8) error {
	if p.Mode.Code == 0 {
		return ErrLightsOff
	}
	if brightness > 4 {
		return ErrOutOfRange
	}
	p.CurrentParams().Brightness = brightness
	return nil
}

func (p *BacklightEffect) SetSpeed(speed uint8) error {
	if p.Mode.Code == 0 {
		return ErrLightsOff
	}
	if !p.Mode.Features.Supports(effect.Speed) {
		return ErrNotSupported
	}
	if speed > 4 {
		return ErrOutOfRange
	}
	p.CurrentParams().Speed = speed
	return nil
}

func (p *BacklightEffect) SetColor(color uint8) error {
	if p.Mode.Code == 0 {
		return ErrLightsOff
	}
	if !p.Mode.Features.SupportsAny(effect.SpecificColor, effect.RandomColor) {
		return ErrNotSupported
	}
	if color == 7 && !p.Mode.Features.Supports(effect.RandomColor) {
		return ErrNotSupported
	}
	p.CurrentParams().Color = color
	return nil
}
