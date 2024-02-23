package dto

import "github.com/mishamyrt/nuga-lib/keys/layout"

type KeyMap layout.KeyMap

type Key struct {
	Title string `json:"title"`
	Value string `json:"value"`
}

type KeyGroup struct {
	Title string `json:"title"`
	Keys  []Key  `json:"keys"`
}
