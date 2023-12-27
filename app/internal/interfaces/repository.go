// Package interfaces contains top-level app interfaces
package interfaces

import (
	"nuga/pkg/device"
	"nuga/pkg/light"
	"nuga_ui/internal/dto"
)

// Repository represents an aggregate repository that encapsulates various repositories related to the application.
type Repository struct {
	Device      DeviceRepository
	Settings    SettingsRepository
	Environment EnvironmentRepository
}

// DeviceRepository defines the interface for device-related operations.
type DeviceRepository interface {
	IsConnected() bool
	Connect() string
	Disconnect() error
	Simulate(template light.SimulationTemplate) (string, error)
	Get() *device.Device
}

// SettingsRepository defines the interface for managing application settings.
type SettingsRepository interface {
	Read() error
	GetMode() *dto.ModeConfig
	SetMode(m dto.ModeConfig) error
	GetUI() *dto.UIConfig
	SetUI(ui dto.UIConfig) error
}

// EnvironmentRepository defines the interface for retrieving environment-related information.
type EnvironmentRepository interface {
	GetOS() dto.OS
	GetVersion() string
}
