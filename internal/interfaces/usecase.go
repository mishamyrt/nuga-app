package interfaces

import (
	"context"
	"nuga_ui/internal/dto"
	"nuga_ui/internal/entity"

	"github.com/mishamyrt/nuga-lib/light"
)

// Usecase represents an aggregate use case that encapsulates various use cases related to the application.
type Usecase struct {
	Environment EnvironmentUsecase
	Device      DeviceUsecase
	Settings    SettingsUsecase
	Lights      LightsUsecase
}

// Slice returns a slice of BasicUsecase containing the individual use cases.
func (u *Usecase) Slice() []BasicUsecase {
	return []BasicUsecase{
		u.Environment,
		u.Device,
		u.Settings,
		u.Lights,
	}
}

// BasicUsecase defines the basic interface for use cases.
type BasicUsecase interface {
	OnStartup(ctx context.Context, repo *Repository) error
	OnShutdown() error
}

// DeviceUsecase defines the interface for device-related use cases.
type DeviceUsecase interface {
	BasicUsecase
	Connect() string
	SimulateConnection() string
	Disconnect() error
}

// EnvironmentUsecase defines the interface for environment-related use cases.
type EnvironmentUsecase interface {
	BasicUsecase
	GetVersion() string
	GetOS() string
	Restart()
}

// SettingsUsecase defines the interface for managing application settings use cases.
type SettingsUsecase interface {
	BasicUsecase
	GetModeSettings() entity.ModeConfig
	SetModeSettings(m entity.ModeConfig) error
	GetAppSettings() entity.AppConfig
	SetAppSettings(ui entity.AppConfig) error
}

// LightsUsecase defines the interface for lighting-related use cases.
type LightsUsecase interface {
	BasicUsecase
	GetLightModes() dto.LightModes
	GetLightState() (dto.LightState, error)
	SetLightState(r dto.LightStateRequest) error
	GetBacklightColors() (dto.BacklightColors, error)
	SetBacklightColor(mode, index uint8, color light.RGB) error
	SavePreset() error
	LoadPreset() error
}
