package usecase

import "nuga_ui/internal/interfaces"

// New creates application use case instance
func New() *interfaces.Usecase {
	environment := EnvironmentUsecase{}
	device := DeviceUsecase{}
	settings := SettingsUsecase{}
	lights := LightsUsecase{}
	return &interfaces.Usecase{
		Environment: &environment,
		Device:      &device,
		Settings:    &settings,
		Lights:      &lights,
	}
}
