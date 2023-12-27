package settings

import (
	"nuga_ui/internal/dto"
)

// Repository represents settings repository
type Repository struct {
	file *File
}

// New creates settings repository
func New(filePath string) *Repository {
	return &Repository{
		file: FromPath(filePath),
	}
}

// GetMode returns stored mode settings
func (r *Repository) GetMode() *dto.ModeConfig {
	return &r.file.Config.Mode
}

// SetMode writes mode settings to file
func (r *Repository) SetMode(m dto.ModeConfig) error {
	r.file.Config.Mode = m
	return r.file.Write()
}

// GetUI writes mode settings to file
func (r *Repository) GetUI() *dto.UIConfig {
	return &r.file.Config.App
}

// SetUI writes mode settings to file
func (r *Repository) SetUI(ui dto.UIConfig) error {
	r.file.Config.App = ui
	return r.file.Write()
}

// SetModeSettings writes mode settings to file
func (r *Repository) Read() error {
	_, err := r.file.Read()
	return err
}
