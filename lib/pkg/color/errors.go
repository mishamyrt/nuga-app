// Package color contains utils to work with colors
package color

import "errors"

// ErrInvalidLength is returned when HEX color string length is unexpected
var ErrInvalidLength = errors.New("invalid length, must be 7 or 4")
