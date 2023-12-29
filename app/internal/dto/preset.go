package dto

import "nuga/pkg/light"

type LightsStatePreset *light.Effects

type LightsPreset struct {
	Name   string            `json:"name"`
	Colors BacklightColors   `json:"colors"`
	State  LightsStatePreset `json:"state"`
}
