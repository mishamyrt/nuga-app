// Package nuga contains application backend
package nuga

import (
	"context"
	"encoding/json"
	"log"
	"nuga/pkg/device"
	"nuga/pkg/hid"
	"nuga/pkg/light"
	"nuga_ui/internal/settings"
	"nuga_ui/internal/updates"
	"os"

	go_runtime "runtime"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx            context.Context
	dev            *device.Device
	storedSettings *settings.File
	mode           OSMode
}

// OnStartup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) OnStartup(ctx context.Context) {
	err := hid.Init()
	if err != nil {
		log.Panicf("Error while initializing HID: %v", err)
	}
	a.ctx = ctx
}

// GetOS returns current client OS name
func (a *App) GetOS() string {
	os := go_runtime.GOOS
	if os == "darwin" {
		return OSMac
	}
	return os
}

// CheckUpdates starts update check in background
func (a *App) CheckUpdates() {
	go func() {
		updater := updates.GitHubUpdater{FullName: "mishamyrt/Nuga"}
		latest, err := updater.Latest()
		if err != nil || len(latest) == 0 {
			return
		}
		if AppVersion != latest {
			runtime.EventsEmit(a.ctx, "update", updater.ReleaseURL(latest))
		}
	}()
}

// OnShutdown is called when the app closes
func (a *App) OnShutdown(_ context.Context) {
	err := hid.Exit()
	if err != nil {
		log.Panicf("Error while closing HID: %v", err)
	}
}

// GetVersion returns current executable version
func (a *App) GetVersion() string {
	return AppVersion
}

// SimulateConnection initiates simulation start
func (a *App) SimulateConnection() string {
	path, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Nuga JSON dump",
				Pattern:     "*.json",
			},
		},
	})
	if err != nil {
		log.Printf("Error while opening simulation template: %v", err)
	}
	if path == "" {
		return ""
	}
	content, err := os.ReadFile(path)
	if err != nil {
		log.Printf("Error while reading simulation template: %v", err)
	}
	var template light.SimulationTemplate
	err = json.Unmarshal(content, &template)
	if err != nil {
		log.Printf("Error while parsing simulation template: %v", err)
	}
	a.dev, err = device.OpenSimulation(template)
	if err != nil {
		log.Printf("Error while loading simulation: %v", err)
	}
	return a.dev.Name
}

// Disconnect light.
func (a *App) Disconnect() {
	a.dev = nil
}

// Connect initiates connection and returns a keyboard name
func (a *App) Connect() string {
	var err error
	if a.dev == nil {
		a.dev, err = device.Open()
		if err != nil {
			return ""
		}
	}
	return a.dev.Name
}

// GetPath returns current device path
func (a *App) GetPath() string {
	return a.dev.Path
}

// GetFirmware returns current device firmware version
func (a *App) GetFirmware() string {
	return a.dev.Firmware
}

// NewApp creates a new application struct
func NewApp(file *settings.File) *App {
	return &App{
		storedSettings: file,
	}
}
