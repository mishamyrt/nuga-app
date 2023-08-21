// Package main contains UI application
package main

import (
	"embed"
	"log"
	"nuga_ui/internal/nuga"
	"nuga_ui/internal/settings"
	"os"
	"path"

	"github.com/wailsapp/wails/v2"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func configDir() (string, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}
	dir := path.Join(homeDir, ".local", "Nuga")
	return dir, nil
}

func main() {
	dir, err := configDir()
	if err != nil {
		log.Panicf("Error while building user directory path %s", err)
	}
	file := settings.ByPath(dir)
	content, err := file.Read()
	if err != nil {
		log.Printf("Error while reading settings %s", err)
	}
	app := nuga.NewApp(file)
	state := nuga.GetState(content)

	err = wails.Run(app.GetOptions(assets, icon, state))

	if err != nil {
		println("Error:", err.Error())
	}
}
