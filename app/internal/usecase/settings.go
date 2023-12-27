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

// GetMode returns stored mode settings
func (s *SettingsUsecase) GetMode() dto.ModeConfig {
	return *s.repo.Settings.GetMode()
}

// SetMode writes mode settings to file
func (s *SettingsUsecase) SetMode(m dto.ModeConfig) error {
	return s.repo.Settings.SetMode(m)
}

// GetUI reads app theme settings from file
func (s *SettingsUsecase) GetUI() dto.UIConfig {
	return *s.repo.Settings.GetUI()
}

// SetUI writes app theme settings from file
func (s *SettingsUsecase) SetUI(ui dto.UIConfig) error {
	return s.repo.Settings.SetUI(ui)
}
