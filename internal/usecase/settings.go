package usecase

import (
	"context"
	"nuga_ui/internal/dto"
	"nuga_ui/internal/interfaces"
)

// SettingsUsecase represents settings-related use case
type SettingsUsecase struct {
	repo *interfaces.Repository
}

// OnStartup is a life-cycle hook that runs when app starts
func (s *SettingsUsecase) OnStartup(_ context.Context, repo *interfaces.Repository) error {
	s.repo = repo
	return nil
}

// OnShutdown is a life-cycle hook that runs when app finishes
func (s *SettingsUsecase) OnShutdown() error {
	return nil
}

// GetModeSettings returns stored mode settings
func (s *SettingsUsecase) GetMode() dto.OSMode {
	return s.repo.Settings.GetMode()
}

// SetModeSettings writes mode settings to file
func (s *SettingsUsecase) SetMode(m dto.OSMode) error {
	return s.repo.Settings.SetMode(m)
}

// GetAppSettings reads app theme settings from file
func (s *SettingsUsecase) GetAppSettings() dto.AppSettings {
	return *s.repo.Settings.GetApp()
}

// SetAppSettings writes app theme settings from file
func (s *SettingsUsecase) SetAppSettings(app dto.AppSettings) error {
	return s.repo.Settings.SetApp(app)
}
