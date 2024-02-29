// Package errors contains app errors
package errors

import "errors"

var (
	// ErrStateWrongDevice returns when user trying to apply preset
	// for different device then connected.
	ErrStateWrongDevice = errors.New("STATE_WRONG_DEVICE")
)
