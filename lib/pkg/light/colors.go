// Package light contains set of utils to work with keyboard.
package light

import (
	"log"
	"nuga/pkg/color"
)

// ColorState represents keyboard color state.
type ColorState [48][7]color.RGB

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
	s.SetBacklight(m+24, i, c)
}

// SetWinBacklight color to state.
func (s *ColorState) SetWinBacklight(m uint8, i uint8, c color.RGB) {
	s.SetBacklight(m, i, c)
}

// Get color from state.
func (s *ColorState) Get(effect uint8, index uint8) color.RGB {
	return s[effect][index]
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
