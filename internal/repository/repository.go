// Package repository represents app repository
package repository

import (
	"nuga_ui/internal/interfaces"
	"nuga_ui/internal/repository/device"
	"nuga_ui/internal/repository/environment"
	"nuga_ui/internal/repository/settings"
	"nuga_ui/internal/repository/state"
)

// New creates new repository instance
func New(directory string) (*interfaces.Repository, error) {
	settings, err := settings.NewAtDirectory(directory)
	if err != nil {
		return nil, err
	}
	return &interfaces.Repository{
		Device:      device.New(),
		Settings:    settings,
		Environment: environment.New(),
		State:       state.New(),
	}, nil
}
