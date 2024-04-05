package dto

import (
	"bytes"

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

// IsSameMacro checks if two macros are the same
func IsSameMacro(m1, m2 keys.Macro) (bool, error) {
	a, err := m1.Bytes()
	if err != nil {
		return false, err
	}
	b, err := m2.Bytes()
	if err != nil {
		return false, err
	}
	return bytes.Equal(a, b), nil
}

// Macros represents a list of macros.
type Macros []MacroWithTitle

// ToDomain converts Macros to keys.Macros
func (m Macros) ToDomain() keys.Macros {
	macros := make(keys.Macros, 0, len(m))
	for _, macro := range m {
		macros = append(macros, macro.Macro)
	}
	return macros
}

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
