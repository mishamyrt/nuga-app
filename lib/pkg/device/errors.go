package device

import "errors"

// ErrNotSupported is returned when you try to open a keyboard that is not supported by the application
var ErrNotSupported = errors.New("device is not supported")

// ErrWrongVendor is returned when you try to open a keyboard not from NuPhy
var ErrWrongVendor = errors.New("device vendor is not NuPhy")
