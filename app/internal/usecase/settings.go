package usecase

import (
	"context"
	"nuga_ui/internal/entity"
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

// GetMode returns stored mode settings
func (s *SettingsUsecase) GetModeSettings() entity.ModeConfig {
	return *s.repo.Settings.GetMode()
}

// SetMode writes mode settings to file
func (s *SettingsUsecase) SetModeSettings(m entity.ModeConfig) error {
	return s.repo.Settings.SetMode(m)
}

// GetUI reads app theme settings from file
func (s *SettingsUsecase) GetAppSettings() entity.AppConfig {
	return *s.repo.Settings.GetApp()
}

// SetUI writes app theme settings from file
func (s *SettingsUsecase) SetAppSettings(app entity.AppConfig) error {
	return s.repo.Settings.SetApp(app)
}
