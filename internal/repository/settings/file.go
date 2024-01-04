// Package settings contains utils for settings file
package settings

import (
	"encoding/json"
	"nuga_ui/internal/entity"
	"os"
	"path"
)

// File represents settings file
type File struct {
	DirPath string
	Name    string
	Config  entity.Config
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
func (f *File) Read() error {
	data, err := os.ReadFile(f.Path())
	if err != nil {
		return err
	}
	err = json.Unmarshal(data, &f.Config)
	if err != nil {
		return err
	}
	return nil
}

// FromPath returns File settings by directory
func FromPath(directory string) (*File, error) {
	file := File{
		DirPath: directory,
		Name:    "settings.json",
	}
	if file.Read() != nil {
		err := file.Write()
		if err != nil {
			return nil, err
		}
	}
	return &file, nil
}
