package keyboard

import (
	"log"
	"nuga/pkg/color"
)

type ColorState [48][7]color.RGB

func (s *ColorState) Bytes() []byte {
	var buf []byte = make([]byte, 0)
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

func (s *ColorState) Print() {
	for i := range s {
		log.Println(s[i])
	}
}

func (s *ColorState) Set(rawIndex int, index int, c color.RGB) {
	s[rawIndex][index] = c
}

func (s *ColorState) SetBacklight(mode uint8, index uint8, c color.RGB) {
	s[mode+24][index] = c
}

func (s *ColorState) Get(effect uint8, index uint8) color.RGB {
	return s[effect][index]
}

func ParseColors(data []byte) ColorState {
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
	log.Printf("Tail (%v-%v): %v", offset, len(data)-1, data[offset:])
	return state
}
