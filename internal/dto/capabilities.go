package dto

import "github.com/mishamyrt/nuga-lib"

// Supports represents keyboard model capabilities
type Supports struct {
	Backlight bool `json:"backlight"`
	Sidelight bool `json:"sidelight"`
	Halolight bool `json:"halolight"`
	Keys      bool `json:"keys"`
}

// SupportedCapabilities returns keyboard model capabilities
func SupportedCapabilities(c *nuga.Capability) *Supports {
	return &Supports{
		Backlight: c.Has(nuga.BacklightCapability),
		Sidelight: c.Has(nuga.SidelightCapability),
		Halolight: c.Has(nuga.HalolightCapability),
		Keys:      c.Has(nuga.KeysCapability),
	}
}
