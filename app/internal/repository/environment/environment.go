// Package environment contains environment repository
package environment

import (
	"nuga_ui/config"
	"nuga_ui/internal/entity"
	"runtime"
)

// Repository represents the environment repository.
type Repository struct{}

// New creates a new instance of the Repository.
func New() *Repository {
	return &Repository{}
}

// GetOS retrieves the operating system information.
// It returns a string representing the current operating system.
func (r *Repository) GetOS() string {
	os := runtime.GOOS
	if os == "darwin" {
		return string(entity.MacOS)
	}
	return os
}

// GetVersion retrieves the application version.
// It returns a string representing the version of the application.
func (r *Repository) GetVersion() string {
	return config.AppVersion
}
