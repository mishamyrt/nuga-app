// Package settings contains utils for settings file
package settings

import (
	"encoding/json"
	"os"
	"path"
)

// FileExtension represents settings file extension
const FileExtension = ".json"

// File represents settings file
type File struct {
	DirPath string
	Name    string
	content Content
}

// Path returns path to settings file
func (f *File) Path() string {
	return path.Join(f.DirPath, f.Name)
}

// Write settings to file
func (f *File) Write(c *Content) error {
	data, err := json.Marshal(c)
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
func (f *File) Read() (*Content, error) {
	data, err := os.ReadFile(f.Path())
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(data, &f.content)
	if err != nil {
		return nil, err
	}
	return &f.content, nil
}

// ByPath returns File settings by directory
func ByPath(directory string) *File {
	file := File{
		DirPath: directory,
		Name:    "settings" + FileExtension,
	}
	return &file
}
