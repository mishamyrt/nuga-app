package keyboard

import "errors"

var ErrLightsOff = errors.New("this action cannot be performed when the lights are off")

var ErrNotSupported = errors.New("current light mode does not support changing this property")

var ErrOutOfRange = errors.New("passed value is outside the permitted limits")
