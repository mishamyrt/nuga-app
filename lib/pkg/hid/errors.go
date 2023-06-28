package hid

import (
	"errors"
	"fmt"
)

// ErrNotFound is returned when the device wasn't found
var ErrNotFound = errors.New("keyboard is not found")

// NewErrCountMismatch creates a byte count mismatch error.
func NewErrCountMismatch(expected, actual int) error {
	message := fmt.Sprintf(
		"the transmitted number of bytes is not the same as expected. Transmitted %d when it should be %d",
		actual,
		expected,
	)
	return errors.New(message)
}
