// Package light contains set of utils to work with keyboard.
package light

import (
	"log"
	"nuga/pkg/color"
)

// ModesCount represents modes count per OS mode
const ModesCount = 24

// ColorState represents keyboard color state.
type ColorState [ModesCount * 2][7]color.RGB

// Bytes converts color state to raw byte slice.
func (s *ColorState) Bytes() []byte {
	var buf = make([]byte, 0)
	var c color.RGB
	for effect := range s {
		for i := range s[effect] {
			c = s[effect][i]
			buf = append(buf, c.R, c.G, c.B)
		}
	}
	buf = append(buf, ColorsSuffix...)
	return buf
}

// Print logs color state.
func (s *ColorState) Print() {
	for i := range s {
		log.Println(s[i])
	}
}

// Slice returns colors as slice
func (s *ColorState) Slice() [][]color.RGB {
	return s.toSlice(s[:])
}

// Set color to state.
func (s *ColorState) Set(rawIndex int, index int, c color.RGB) {
	s[rawIndex][index] = c
}

// SetBacklight color to state.
func (s *ColorState) SetBacklight(m uint8, i uint8, c color.RGB) {
	s[m][i] = c
}

// SetMacBacklight color to state.
func (s *ColorState) SetMacBacklight(m uint8, i uint8, c color.RGB) {
	s.SetBacklight(m+ModesCount, i, c)
}

// SetWinBacklight color to state.
func (s *ColorState) SetWinBacklight(m uint8, i uint8, c color.RGB) {
	s.SetBacklight(m, i, c)
}

// Get color from state.
func (s *ColorState) Get(effect uint8, index uint8) color.RGB {
	return s[effect][index]
}

// GetMac returns colors for mac OS mode.
func (s *ColorState) GetMac() [][]color.RGB {
	return s.toSlice(s[ModesCount : ModesCount*2])
}

// GetWin returns colors for win OS mode.
func (s *ColorState) GetWin() [][]color.RGB {
	return s.toSlice(s[0:ModesCount])
}

func (s *ColorState) toSlice(modes [][7]color.RGB) [][]color.RGB {
	result := make([][]color.RGB, len(modes))
	for i, colors := range modes {
		result[i] = make([]color.RGB, 7)
		copy(result[i], colors[:])
	}
	return result
}

// ParseColors parses the raw byte slice into ColorState.
func ParseColors(data []byte) *ColorState {
	var state ColorState
	var offset int
	for effect := 0; effect < 48; effect++ {
		for i := 0; i < 7; i++ {
			offset = (effect * 21) + (i * 3)
			state[effect][i] = color.RGB{
				R: data[offset],
				G: data[offset+1],
				B: data[offset+2],
			}
		}
	}
	return &state
}

// ColorsFromSlice loads color state from colors slice
func ColorsFromSlice(modes [][]color.RGB) *ColorState {
	var state ColorState
	for effect := 0; effect < 48; effect++ {
		for i := 0; i < 7; i++ {
			state[effect][i] = modes[effect][i]
		}
	}
	return &state
}
