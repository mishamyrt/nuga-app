package light

import (
	"math"
	"nuga/pkg/light/effect"
)

// EffectParams represents keyboard effect parameters.
type EffectParams struct {
	// Color represents effect color. Number from 0 to 7
	Color uint8 `json:"color"`
	// Speed represents effect speed. Number from 0 to 4
	Speed uint8 `json:"speed"`
	// Speed represents effect speed. Number from 0 to 4
	Brightness uint8 `json:"brightness"`
}

// Effects represents keyboard effects state.
type Effects struct {
	Backlight BacklightEffect `json:"backlight"`
	Sidelight MiscEffect      `json:"sidelight"`
	Halo      MiscEffect      `json:"halo"`
}

// Bytes returns effects as a raw byte slice.
func (b *Effects) Bytes() []byte {
	buf := make([]byte, 0)
	buf = append(buf, ParamsHeader...)
	buf = append(buf, b.Backlight.Mode.Code)
	buf = append(buf, ParamsMiscHeader...)
	buf = append(
		buf,
		b.Sidelight.Mode.Code,
		b.Sidelight.Color,
		b.Sidelight.Brightness,
		b.Sidelight.Speed,
	)
	buf = append(
		buf,
		b.Halo.Mode.Code,
		b.Halo.Color,
		b.Halo.Brightness,
		b.Halo.Speed,
	)
	buf = append(buf, 0xFF, 0xFF)
	for _, param := range b.Backlight.Params {
		value := (param.Speed * 16) + param.Brightness
		buf = append(buf, param.Color, value)
	}
	buf = append(buf, ParamsSuffix...)
	return buf
}

// ParseParams parses raw bytes to effects struct.
func ParseParams(data []byte) *Effects {
	result := &Effects{}
	var offset int
	var value uint8
	result.Halo.Mode = effect.Halo.Find(data[16])
	result.Halo.Color = data[17]
	result.Halo.Brightness = data[18]
	result.Halo.Speed = data[19]
	result.Sidelight.Mode = effect.Sidelight.Find(data[12])
	result.Sidelight.Color = data[13]
	result.Sidelight.Brightness = data[14]
	result.Sidelight.Speed = data[15]
	result.Backlight.Mode = effect.Backlight.Find(data[5])
	result.Backlight.Params = make([]EffectParams, 29)
	for i := range result.Backlight.Params {
		offset = ColorOffset + (i * 2)
		value = data[offset+1]
		result.Backlight.Params[i] = EffectParams{
			Color:      data[offset],
			Speed:      uint8(math.Floor(float64(value) / 16)),
			Brightness: value % 16,
		}
	}
	return result
}
