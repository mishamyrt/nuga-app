package settings

import (
	"nuga_ui/internal/dto"
)

// Repository represents settings repository
type Repository struct {
	storage *File
}

// NewAtDirectory creates settings repository
func NewAtDirectory(path string) (*Repository, error) {
	file := File{
		DirPath: path,
		Name:    "settings.json",
	}
	var err error
	if file.Read() != nil {
		initSettings(&file.Content)
		err = file.Write()
	}
	return &Repository{
		storage: &file,
	}, err
}

func initSettings(s *dto.Settings) {
	s.App = dto.AppSettings{
		UI:    dto.CurrentOS(),
		Theme: dto.AutoUITheme,
	}
	s.Mode = dto.MacOSMode
}

// GetMode returns stored mode settings
func (r *Repository) GetMode() dto.OSMode {
	return r.storage.Content.Mode
}

// SetMode writes mode settings to file
func (r *Repository) SetMode(m dto.OSMode) error {
	r.storage.Content.Mode = m
	return r.storage.Write()
}

// GetApp writes mode settings to file
func (r *Repository) GetApp() *dto.AppSettings {
	return &r.storage.Content.App
}

// SetApp writes mode settings to file
func (r *Repository) SetApp(ui dto.AppSettings) error {
	r.storage.Content.App = ui
	return r.storage.Write()
}

// GetMacros returns stored macros
func (r *Repository) GetMacros() dto.Macros {
	return r.storage.Content.Macro
}

// SetMacros writes macros to file
func (r *Repository) SetMacros(macros dto.Macros) error {
	r.storage.Content.Macro = macros
	return r.storage.Write()
}
