package dto

import (
	"github.com/mishamyrt/nuga-lib/dump"
)

// StateFile represents keyboard state file
type StateFile struct {
	Version string `json:"version"`
	*dump.State
}
