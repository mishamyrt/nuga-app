package nuga

import (
	"io/fs"
	"nuga_ui/internal/settings"
	"runtime"

	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

// GetState builds UIState from settings
func GetState(s *settings.Content) *UIState {
	var state UIState
	if s == nil {
		state.Theme = Auto
		return &state
	}
	currentOS := runtime.GOOS
	if currentOS == "darwin" {
		currentOS = OSMac
	}
	state.Universal = currentOS != s.UI
	switch s.Theme {
	case "dark":
		state.Theme = Dark
	case "light":
		state.Theme = Light
	case "auth":
		state.Theme = Auto
	}
	return &state
}

// GetOptions returns application options
func (a *App) GetOptions(assets fs.FS, icon []byte, state *UIState) *options.App {
	macTitleBar := mac.TitleBarHiddenInset()
	macAppearance := mac.DefaultAppearance
	if state.Universal {
		macTitleBar = mac.TitleBarDefault()
	}
	return &options.App{
		Title:     "Nuga",
		Width:     800,
		MinWidth:  730,
		Height:    700,
		MinHeight: 450,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Mac: &mac.Options{
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			Appearance:           macAppearance,
			TitleBar:             macTitleBar,
			About: &mac.AboutInfo{
				Title:   "Nuga",
				Message: "© 2023 Mikhael Khrustik",
				Icon:    icon,
			},
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		OnStartup:        a.OnStartup,
		OnShutdown:       a.OnShutdown,
		Bind: []interface{}{
			a,
		},
	}
}
