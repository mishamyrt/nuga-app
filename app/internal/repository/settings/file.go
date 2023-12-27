// Package settings contains utils for settings file
package settings

import (
	"encoding/json"
	"nuga_ui/internal/dto"
	"os"
	"path"
)

// FileExtension represents settings file extension
const FileExtension = ".json"

// File represents settings file
type File struct {
	DirPath string
	Name    string
	Config  dto.Config
}

// Path returns path to settings file
func (f *File) Path() string {
	return path.Join(f.DirPath, f.Name)
}

// Write settings to file
func (f *File) Write() error {
	data, err := json.Marshal(f.Config)
	if err != nil {
		return err
	}
	if !Exists(f.DirPath) {
		err = os.MkdirAll(f.DirPath, 0755)
		if err != nil {
			return err
		}
	}
	err = os.WriteFile(f.Path(), data, 0644)
	if err != nil {
		return err
	}
	return nil
}

// Read settings from file
func (f *File) Read() (*dto.Config, error) {
	data, err := os.ReadFile(f.Path())
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(data, &f.Config)
	if err != nil {
		return nil, err
	}
	return &f.Config, nil
}

// FromPath returns File settings by directory
func FromPath(directory string) *File {
	file := File{
		DirPath: directory,
		Name:    "settings" + FileExtension,
	}
	return &file
}
