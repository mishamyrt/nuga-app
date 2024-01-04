package dto

import (
	"github.com/mishamyrt/nuga-lib/light"
)

// LightModes represents all domain modes
type LightModes []light.Domain

// LightState represents keyboard light state.
type LightState struct {
	light.Effects
	BacklightParams *light.EffectParams `json:"backlightParams"`
}

// LightDomainRequest represents request part from frontend
type LightDomainRequest struct {
	Color      uint8 `json:"color"`
	Speed      uint8 `json:"speed"`
	Brightness uint8 `json:"brightness"`
	Mode       uint8 `json:"mode"`
}

// LightStateRequest represents request from frontend
type LightStateRequest struct {
	Backlight LightDomainRequest `json:"backlight"`
	Sidelight LightDomainRequest `json:"sidelight"`
	Halo      LightDomainRequest `json:"halo"`
}

// BacklightColors represents backlight color array for modes
type BacklightColors [][]light.RGB
