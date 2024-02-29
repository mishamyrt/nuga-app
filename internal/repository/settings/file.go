// Package settings contains utils for settings file
package settings

import (
	"encoding/json"
	"nuga_ui/internal/dto"
	"os"
	"path"
)

// File represents settings file
type File struct {
	DirPath string
	Name    string
	Content dto.Settings
}

// Path returns path to settings file
func (f *File) Path() string {
	return path.Join(f.DirPath, f.Name)
}

// Write settings to file
func (f *File) Write() error {
	data, err := json.Marshal(f.Content)
	if err != nil {
		return err
	}
	if !fileExists(f.DirPath) {
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
	err = json.Unmarshal(data, &f.Content)
	if err != nil {
		return err
	}
	if f.Content.Mode != "mac" && f.Content.Mode != "win" {
		f.Content.Mode = "mac"
	}
	return nil
}

func fileExists(path string) bool {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return false
	}
	return true
}
