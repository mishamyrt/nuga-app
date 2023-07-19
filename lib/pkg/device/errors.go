package device

import "errors"

var ErrNotSupported = errors.New("device is not supported")

var ErrWrongVendor = errors.New("device vendor is not NuPhy")
