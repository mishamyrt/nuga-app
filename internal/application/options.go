package application

import (
	"nuga_ui/config"
	"nuga_ui/internal/dto"

	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

// GetState builds UIState from settings
func (a *Application) getState() (dto.AppTheme, dto.OS, bool) {
	config := a.repo.Settings.GetApp()
	os := a.repo.Environment.GetOS()
	universal := os != string(config.UI)
	return config.Theme, config.UI, universal
}

// GetOptions for wails
func (a *Application) GetOptions() *options.App {
	theme, os, universal := a.getState()
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

	minWidth := 730
	minHeight := 600
	if os == "linux" {
		minWidth = 800
		minHeight = 730
	}
	return &options.App{
		Title:     config.AppName,
		Width:     800,
		MinWidth:  minWidth,
		Height:    minHeight,
		MinHeight: minHeight,
		MaxWidth:  1000,
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
