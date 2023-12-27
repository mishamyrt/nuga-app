// Package dto contains app models
package dto

// UITheme represents app UI theme
type UITheme uint8

const (
	// DarkUITheme represents dark app UI theme
	DarkUITheme UITheme = iota
	// LightUITheme represents light app UI theme
	LightUITheme
	// AutoUITheme represents auto app UI theme
	AutoUITheme
)

// String returns UITheme string value
func (u UITheme) String() string {
	switch u {
	case DarkUITheme:
		return "dark"
	case LightUITheme:
		return "light"
	case AutoUITheme:
		return "auto"
	default:
		return ""
	}
}

// UIThemeFromString creates UITheme instance from string
func UIThemeFromString(s string) UITheme {
	switch s {
	case "light":
		return LightUITheme
	case "dark":
		return DarkUITheme
	default:
		return AutoUITheme
	}
}
