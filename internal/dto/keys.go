package dto

import "github.com/mishamyrt/nuga-lib/features/keys/layout"

// KeyMap represents a map of keys.
type KeyMap layout.KeyMap

// Key ... as it names
type Key struct {
	Title string `json:"title"`
	Value string `json:"value"`
}

// KeyGroup represents a group of keys.
type KeyGroup struct {
	Title string `json:"title"`
	Keys  []Key  `json:"keys"`
}
