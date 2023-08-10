package nuga

import (
	"io/fs"
	"log"

	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

// GetOptions returns application options
func (a *App) GetOptions(assets fs.FS, icon []byte) *options.App {
	titlebar := mac.TitleBarHiddenInset()
	log.Println("Universal", Universal)
	if Universal == "true" {
		titlebar = mac.TitleBarDefault()
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
			Appearance:           mac.DefaultAppearance,
			TitleBar:             titlebar,
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
