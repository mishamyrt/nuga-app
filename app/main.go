// Package main contains UI application
package main

import (
	"embed"
	"log"
	"nuga_ui/internal/application"
	"nuga_ui/internal/repository"
	"nuga_ui/internal/usecase"
	"os"
	"path"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func configDir() string {
	dir, err := os.UserHomeDir()
	if err != nil {
		dir = "."
	}
	return path.Join(dir, ".local", "Nuga")
}

func main() {
	configPath := configDir()
	repo, err := repository.New(configPath)
	if err != nil {
		log.Panicf("Error while creating repo: %v", err)
	}
	usecase := usecase.New()
	app := application.New(assets, icon, repo, usecase)
	app.Start()
}
