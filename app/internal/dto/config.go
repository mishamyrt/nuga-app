// Package dto contains app models
package dto

// OSMac is the constant string for macOS
const OSMac = "mac"

// OSLinux is the constant string for Linux based OS
const OSLinux = "linux"

// OSWindows is the constant string for Windows
const OSWindows = "win"

// OSMode represents keyboard OS mode value
type OSMode uint8

const (
	// MacOSMode represents mode when switch is on mac position
	MacOSMode OSMode = iota
	// WindowsOSMode represents mode when switch is on win position
	WindowsOSMode
)

// String returns OSMode as string
func (o OSMode) String() string {
	switch o {
	case MacOSMode:
		return OSMac
	case WindowsOSMode:
		return OSWindows
	default:
		return ""
	}
}

// UIConfig represents the configuration for the user interface settings.
type UIConfig struct {
	UI    string `json:"ui"`
	Theme string `json:"theme"`
}

// ModeConfig represents the configuration for the application mode settings.
type ModeConfig struct {
	OSMode             string `json:"osMode"`
	IndividualSettings bool   `json:"individual"`
}

// Config represents the overall configuration for the application.
type Config struct {
	Mode ModeConfig `json:"mode"`
	App  UIConfig   `json:"app"`
}
