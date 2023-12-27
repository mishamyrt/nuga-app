package dto

import (
	"nuga/pkg/color"
	"nuga/pkg/light"
	"nuga/pkg/light/effect"
)

// LightModes represents all domain modes
type LightModes []effect.Domain

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
type BacklightColors [][7]color.RGB
