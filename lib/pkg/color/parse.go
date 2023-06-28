package color

import (
	"fmt"
)

func ParseHex(s string) (c RGB, err error) {
	switch len(s) {
	case 7:
		_, err = fmt.Sscanf(s, "#%02x%02x%02x", &c.R, &c.G, &c.B)
	case 4:
		_, err = fmt.Sscanf(s, "#%1x%1x%1x", &c.R, &c.G, &c.B)
		// Double the hex digits
		c.R *= 0x11
		c.G *= 0x11
		c.B *= 0x11
	default:
		err = fmt.Errorf("invalid length, must be 7 or 4")
	}
	return
}
