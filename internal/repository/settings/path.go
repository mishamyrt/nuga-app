package settings

import (
	"os"
)

// Exists checks if file or directory exists
func Exists(path string) bool {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return false
	}
	return true
}
