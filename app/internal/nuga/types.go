package nuga

import (
	"nuga/pkg/light"
)

// LightState represents keyboard light state.
type LightState struct {
	light.Effects
	BacklightParams *light.EffectParams
}

// OSMode represent keyboard OS switch mode
type OSMode uint8

const (
	// Both represents mode in which the keyboard settings are set for both win and mac mode
	Both OSMode = iota
	// Win represents mode in which the keyboard settings are set only for win switch mode
	Win = iota
	// Mac represents mode in which the keyboard settings are set only for mac switch mode
	Mac = iota
)
