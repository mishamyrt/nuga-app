package dto

import "runtime"

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

// CurrentOS returns... current OS
func CurrentOS() OS {
	switch runtime.GOOS {
	case "darwin":
		return MacOS
	case "windows":
		return Windows
	}
	return Linux
}

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

// AppThemeFromString creates AppTheme instance from string
func AppThemeFromString(s string) AppTheme {
	switch s {
	case "light":
		return LightUITheme
	case "dark":
		return DarkUITheme
	default:
		return AutoUITheme
	}
}

// AppSettings represents the configuration for the user interface settings.
type AppSettings struct {
	UI    OS       `json:"ui"`
	Theme AppTheme `json:"theme"`
}

// ModeSettings represents the configuration for the application mode settings.
type ModeSettings struct {
	OSMode             OSMode `json:"osMode"`
	IndividualSettings bool   `json:"individual"`
}

// Settings represents the overall configuration for the application.
type Settings struct {
	Mode ModeSettings `json:"mode"`
	App  AppSettings  `json:"app"`
}
