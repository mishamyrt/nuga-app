// Package entity contains app entities
package entity

// OS represents operating system value
type OS string

const (
	// MacOS represents macOS
	MacOS OS = "mac"
	// Windows represents Windows
	Windows OS = "windows"
	// Linux represents GNU Linux
	Linux OS = "linux"
)

// OSMode represents keyboard OS mode value
type OSMode string

const (
	// MacOSMode represents mode when switch is on mac position
	MacOSMode OSMode = "mac"
	// WindowsOSMode represents mode when switch is on win position
	WindowsOSMode OSMode = "win"
)

// AppTheme represents app UI theme
type AppTheme string

const (
	// DarkUITheme represents dark app UI theme
	DarkUITheme AppTheme = "dark"
	// LightUITheme represents light app UI theme
	LightUITheme AppTheme = "light"
	// AutoUITheme represents auto app UI theme
	AutoUITheme AppTheme = "auto"
)

// AppConfig represents the configuration for the user interface settings.
type AppConfig struct {
	UI    OS       `json:"ui"`
	Theme AppTheme `json:"theme"`
}

// ModeConfig represents the configuration for the application mode settings.
type ModeConfig struct {
	OSMode             OSMode `json:"osMode"`
	IndividualSettings bool   `json:"individual"`
}

// Config represents the overall configuration for the application.
type Config struct {
	Mode ModeConfig `json:"mode"`
	App  AppConfig  `json:"app"`
}
