// Package interfaces contains top-level app interfaces
package interfaces

import (
	"nuga/pkg/device"
	"nuga/pkg/light"
	"nuga_ui/internal/entity"
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
	GetMode() *entity.ModeConfig
	SetMode(m entity.ModeConfig) error
	GetApp() *entity.AppConfig
	SetApp(ui entity.AppConfig) error
}

// EnvironmentRepository defines the interface for retrieving environment-related information.
type EnvironmentRepository interface {
	GetOS() string
	GetVersion() string
}
