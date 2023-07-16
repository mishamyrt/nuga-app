// Package main contains UI application
package main

import (
	"embed"
	"nuga_ui/internal/nuga"

	"github.com/wailsapp/wails/v2"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	app := nuga.NewApp()
	err := wails.Run(app.GetOptions(assets))

	if err != nil {
		println("Error:", err.Error())
	}
}
