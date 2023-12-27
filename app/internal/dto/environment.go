package dto

// OS represents operation system
type OS uint8

const (
	// MacOS operation system
	MacOS OS = iota
	// Windows operation system
	Windows
	// Linux operation system
	Linux
)

// String returns OS string value
func (o OS) String() string {
	switch o {
	case MacOS:
		return "mac"
	case Windows:
		return "windows"
	case Linux:
		return "linux"
	default:
		return ""
	}
}

// OSFromString creates OS instance from string
func OSFromString(s string) OS {
	switch s {
	case "mac":
	case "darwin":
		return MacOS
	case "windows":
		return Windows
	case "linux":
		return Linux
	}
	return Linux
}

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
