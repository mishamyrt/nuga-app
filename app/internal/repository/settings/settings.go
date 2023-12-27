package settings

import (
	"nuga_ui/internal/entity"
)

// Repository represents settings repository
type Repository struct {
	storage *File
}

// New creates settings repository
func New(filePath string) (*Repository, error) {
	file, err := FromPath(filePath)
	return &Repository{
		storage: file,
	}, err
}

// GetMode returns stored mode settings
func (r *Repository) GetMode() *entity.ModeConfig {
	return &r.storage.Config.Mode
}

// SetMode writes mode settings to file
func (r *Repository) SetMode(m entity.ModeConfig) error {
	r.storage.Config.Mode = m
	return r.storage.Write()
}

// GetApp writes mode settings to file
func (r *Repository) GetApp() *entity.AppConfig {
	return &r.storage.Config.App
}

// SetApp writes mode settings to file
func (r *Repository) SetApp(ui entity.AppConfig) error {
	r.storage.Config.App = ui
	return r.storage.Write()
}
