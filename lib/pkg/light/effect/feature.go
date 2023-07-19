package effect

import (
	"nuga/pkg/bit"
)

const (
	// SpecificColor flag indicates that mode supports specific color.
	SpecificColor bit.Mask = 1 << iota
	// RandomColor flag indicates that mode supports random color
	RandomColor bit.Mask = 2 << iota
	// Speed flag indicates that mode supports speed.
	Speed bit.Mask = 4 << iota
)
