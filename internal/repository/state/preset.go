// Package state contains repository for state files
package state

import (
	"encoding/json"
	"nuga_ui/internal/dto"
	"os"
)

// Repository represents the preset repository.
type Repository struct{}

// New creates a new instance of the Repository.
func New() *Repository {
	return &Repository{}
}

// WriteFile saves state to file
func (r *Repository) WriteFile(path string, s dto.StateFile) error {
	content, err := json.Marshal(s)
	if err != nil {
		return err
	}
	return os.WriteFile(path, content, 0644)
}

// ReadFile reads state from file
func (r *Repository) ReadFile(path string) (dto.StateFile, error) {
	var preset dto.StateFile
	content, err := os.ReadFile(path)
	if err != nil {
		return preset, err
	}
	err = json.Unmarshal(content, &preset)
	if err != nil {
		return preset, err
	}
	return preset, nil
}
