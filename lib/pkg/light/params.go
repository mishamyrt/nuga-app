package light

import (
	"math"
	"nuga/pkg/light/effect"
)

// EffectParams represents keyboard effect parameters.
type EffectParams struct {
	// Color represents effect color. Number from 0 to 7
	Color uint8
	// Speed represents effect speed. Number from 0 to 4
	Speed uint8
	// Speed represents effect speed. Number from 0 to 4
	Brightness uint8
}

// Effects represents keyboard effects state.
type Effects struct {
	Backlight BacklightEffect
	Sidelight MiscEffect
	Halo      MiscEffect
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
		b.Sidelight.Params.Color,
		b.Sidelight.Params.Brightness,
		b.Sidelight.Params.Speed,
	)
	buf = append(
		buf,
		b.Halo.Mode.Code,
		b.Halo.Params.Color,
		b.Halo.Params.Brightness,
		b.Halo.Params.Speed,
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
	result.Halo = MiscEffect{
		Mode: effect.Halo.Find(data[16]),
		Params: EffectParams{
			Color:      data[17],
			Brightness: data[18],
			Speed:      data[19],
		},
	}
	result.Sidelight = MiscEffect{
		Mode: effect.Sidelight.Find(data[12]),
		Params: EffectParams{
			Color:      data[13],
			Brightness: data[14],
			Speed:      data[15],
		},
	}
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
