// Package preset contains repository for preset files
package preset

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

// SaveLightsPreset saves preset to file
func (r *Repository) SaveLightsPreset(path string, preset dto.LightsPreset) error {
	content, err := json.Marshal(preset)
	if err != nil {
		return err
	}
	return os.WriteFile(path, content, 0644)
}

// ReadLightsPreset reads preset from file
func (r *Repository) ReadLightsPreset(path string) (dto.LightsPreset, error) {
	var preset dto.LightsPreset
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
