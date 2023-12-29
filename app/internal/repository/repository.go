// Package repository represents app repository
package repository

import (
	"nuga_ui/internal/interfaces"
	"nuga_ui/internal/repository/device"
	"nuga_ui/internal/repository/environment"
	"nuga_ui/internal/repository/preset"
	"nuga_ui/internal/repository/settings"
)

// New creates new repository instance
func New(filePath string) (*interfaces.Repository, error) {
	settings, err := settings.New(filePath)
	if err != nil {
		return nil, err
	}
	return &interfaces.Repository{
		Device:      device.New(),
		Settings:    settings,
		Environment: environment.New(),
		Preset:      preset.New(),
	}, nil
}
