// Package interfaces contains top-level app interfaces
package interfaces

import (
	"nuga_ui/internal/dto"

	"github.com/mishamyrt/nuga-lib"
	"github.com/mishamyrt/nuga-lib/dump"
)

// Repository represents an aggregate repository that encapsulates various repositories related to the application.
type Repository struct {
	Device      DeviceRepository
	Settings    SettingsRepository
	Environment EnvironmentRepository
	State       StateRepository
}

// DeviceRepository defines the interface for device-related operations.
type DeviceRepository interface {
	IsConnected() bool
	Connect() string
	Disconnect() error
	Simulate(template *dump.State) (string, error)
	Get() *nuga.Device
}

// SettingsRepository defines the interface for managing application settings.
type SettingsRepository interface {
	GetMode() dto.OSMode
	SetMode(m dto.OSMode) error
	GetApp() *dto.AppSettings
	SetApp(ui dto.AppSettings) error
	GetMacros() dto.Macros
	SetMacros(macros dto.Macros) error
}

// EnvironmentRepository defines the interface for retrieving environment-related information.
type EnvironmentRepository interface {
	GetOS() string
	GetVersion() string
}

// StateRepository defines the interface for retrieving or writing state.
type StateRepository interface {
	WriteFile(path string, preset dto.StateFile) error
	ReadFile(path string) (dto.StateFile, error)
}
