package application

import (
	"nuga_ui/config"
	"nuga_ui/internal/dto"

	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

// GetState builds UIState from settings
func (a *Application) getState() (dto.AppTheme, bool) {
	config := a.repo.Settings.GetApp()
	currentOS := a.repo.Environment.GetOS()
	universal := currentOS != string(config.UI)
	return config.Theme, universal
}

// GetOptions for wails
func (a *Application) GetOptions() *options.App {
	theme, universal := a.getState()
	macTitleBar := mac.TitleBarHiddenInset()
	if universal {
		macTitleBar = mac.TitleBarDefault()
	}
	var macAppearance mac.AppearanceType
	switch theme {
	case dto.LightUITheme:
		macAppearance = mac.NSAppearanceNameVibrantLight
	case dto.DarkUITheme:
		macAppearance = mac.NSAppearanceNameDarkAqua
	case dto.AutoUITheme:
	default:
		macAppearance = mac.DefaultAppearance
	}
	return &options.App{
		Title:     config.AppName,
		Width:     800,
		MinWidth:  730,
		Height:    700,
		MinHeight: 450,
		AssetServer: &assetserver.Options{
			Assets: a.assets,
		},
		Mac: &mac.Options{
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			Appearance:           macAppearance,
			TitleBar:             macTitleBar,
			About: &mac.AboutInfo{
				Title:   config.AppName,
				Message: "© 2023 Mikhael Khrustik",
				Icon:    a.icon,
			},
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		OnStartup:        a.OnStartup,
		OnShutdown:       a.OnShutdown,
		Bind: []interface{}{
			a,
			a.usecase.Device,
			a.usecase.Lights,
			a.usecase.Environment,
			a.usecase.Settings,
			a.usecase.Keys,
		},
	}
}
