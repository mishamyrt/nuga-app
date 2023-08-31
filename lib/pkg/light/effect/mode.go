package effect

import "nuga/pkg/bit"

// Mode represents keyboard light mode
type Mode struct {
	Name     string   `json:"name"`
	Code     byte     `json:"code"`
	Features bit.Mask `json:"features"`
}
