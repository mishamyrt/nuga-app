package dto

import (
	"github.com/mishamyrt/nuga-lib/features/keys"
	"github.com/mishamyrt/nuga-lib/features/keys/layout"
)

// KeyMap represents a map of keys.
type KeyMap layout.KeyMap

// MacroWithTitle represents a macro with a title.
type MacroWithTitle struct {
	keys.Macro
	Title string `json:"title"`
}

// Macros represents a list of macros.
type Macros []MacroWithTitle

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
