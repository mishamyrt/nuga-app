package effect

import "nuga/pkg/bit"

// Mode represents keyboard light mode
type Mode struct {
	Name     string
	Code     byte
	Features bit.Mask
}
