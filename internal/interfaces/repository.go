// Package interfaces contains top-level app interfaces
package interfaces

import (
	"nuga_ui/internal/dto"

	"github.com/mishamyrt/nuga-lib"
)

// Repository represents an aggregate repository that encapsulates various repositories related to the application.
type Repository struct {
	Device      DeviceRepository
	Settings    SettingsRepository
	Environment EnvironmentRepository
	Preset      PresetRepository
}

// DeviceRepository defines the interface for device-related operations.
type DeviceRepository interface {
	IsConnected() bool
	Connect() string
	Disconnect() error
	Simulate(template *nuga.SimulationTemplate) (string, error)
	Get() *nuga.Device
}

// SettingsRepository defines the interface for managing application settings.
type SettingsRepository interface {
	GetMode() *dto.ModeSettings
	SetMode(m dto.ModeSettings) error
	GetApp() *dto.AppSettings
	SetApp(ui dto.AppSettings) error
}

// EnvironmentRepository defines the interface for retrieving environment-related information.
type EnvironmentRepository interface {
	GetOS() string
	GetVersion() string
}

// PresetRepository defines the interface for retrieving or writing presets.
type PresetRepository interface {
	SaveLightsPreset(path string, preset dto.LightsPreset) error
	ReadLightsPreset(path string) (dto.LightsPreset, error)
}
