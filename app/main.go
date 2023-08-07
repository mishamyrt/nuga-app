// Package main contains UI application
package main

import (
	"embed"
	"nuga_ui/internal/nuga"

	"github.com/wailsapp/wails/v2"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	app := nuga.NewApp()
	err := wails.Run(app.GetOptions(assets, icon))

	if err != nil {
		println("Error:", err.Error())
	}
}
