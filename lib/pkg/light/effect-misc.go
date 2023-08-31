package light

import "nuga/pkg/light/effect"

// MiscEffect represents a non-main light, e.g. Halolight.
type MiscEffect struct {
	Mode *effect.Mode `json:"mode"`
	EffectParams
}

// SetBrightness of misc effect.
func (p *MiscEffect) SetBrightness(brightness uint8) error {
	if p.Mode.Code == 0 {
		return ErrLightsOff
	}
	if brightness > 4 {
		return ErrOutOfRange
	}
	p.Brightness = brightness
	return nil
}

// SetSpeed of misc effect.
func (p *MiscEffect) SetSpeed(speed uint8) error {
	if p.Mode.Code == 0 {
		return ErrLightsOff
	}
	if !p.Mode.Features.IsSet(effect.Speed) {
		return ErrNotSupported
	}
	if speed > 4 {
		return ErrOutOfRange
	}
	p.Speed = speed
	return nil
}

// SetColor of misc effect.
func (p *MiscEffect) SetColor(color uint8) error {
	if !p.Mode.Features.IsSet(effect.SpecificColor) {
		return ErrNotSupported
	}
	// 6, not 7, because the extra lights do not support random colors
	if color > 6 {
		return ErrOutOfRange
	}
	p.Color = color
	return nil
}
