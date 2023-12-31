package dto

import "github.com/mishamyrt/nuga-lib/light"

// LightsStatePreset represents lights state
type LightsStatePreset *light.Effects

// LightsPreset represents lights preset file
type LightsPreset struct {
	Name   string            `json:"name"`
	Colors BacklightColors   `json:"colors"`
	State  LightsStatePreset `json:"state"`
}
