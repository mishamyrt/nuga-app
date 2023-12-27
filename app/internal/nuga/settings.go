package nuga

import (
	"log"
	"nuga_ui/internal/settings"
)

// GetModeSettings returns stored mode settings
func (a *App) GetModeSettings() *settings.Mode {
	return &a.storedSettings.Content.Mode
}

// SetModeSettings writes mode settings to file
func (a *App) SetModeSettings(s settings.Mode) {
	if s.IndividualSettings {
		switch s.OSMode {
		case OSMac:
			a.mode = Mac
		case "win":
			a.mode = Win
		}
	} else {
		a.mode = Both
	}
	err := a.storedSettings.WriteMode(s)
	if err != nil {
		log.Printf("Mode settings write error %s", err.Error())
	}
}

// GetAppSettings reads app theme settings from file
func (a *App) GetAppSettings() *settings.App {
	return &a.storedSettings.Content.App
}

// SetAppSettings writes app theme settings from file
func (a *App) SetAppSettings(s settings.App) {
	err := a.storedSettings.WriteApp(s)
	if err != nil {
		log.Printf("Mode settings write error %s", err.Error())
	}
}
