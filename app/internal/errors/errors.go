// Package errors contains app errors
package errors

import "errors"

var (
	// ErrPresetWrongDevice returns when user trying to apply preset
	// for different device then connected.
	ErrPresetWrongDevice = errors.New("PRESET_WRONG_DEVICE")
)
