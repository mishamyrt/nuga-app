// Package usecase contains application use cases
package usecase

import (
	"context"
	"encoding/json"
	"log"
	"nuga_ui/config"
	"nuga_ui/internal/dto"
	"nuga_ui/internal/errors"
	"nuga_ui/internal/interfaces"
	"os"

	"github.com/mishamyrt/nuga-lib"
	"github.com/mishamyrt/nuga-lib/dump"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// DeviceUsecase represents device-related use case
type DeviceUsecase struct {
	ctx  context.Context
	repo *interfaces.Repository
}

// OnStartup is a life-cycle hook that runs when app starts
func (d *DeviceUsecase) OnStartup(ctx context.Context, repo *interfaces.Repository) error {
	d.repo = repo
	d.ctx = ctx
	return nuga.Init()
}

// OnShutdown is a life-cycle hook that runs when app finishes
func (d *DeviceUsecase) OnShutdown() error {
	return nuga.Exit()
}

// SimulateConnection start connection simulation
func (d *DeviceUsecase) SimulateConnection() string {
	path, err := runtime.OpenFileDialog(d.ctx, runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Nuga JSON dump",
				Pattern:     "*.json",
			},
		},
	})
	if err != nil {
		log.Printf("Error while opening simulation template: %v", err)
		return ""
	}
	if path == "" {
		return ""
	}
	content, err := os.ReadFile(path)
	if err != nil {
		log.Printf("Error while reading simulation template: %v", err)
		return ""
	}
	var template dump.State
	err = json.Unmarshal(content, &template)
	if err != nil {
		log.Printf("Error while parsing simulation template: %v", err)
		return ""
	}
	name, err := d.repo.Device.Simulate(&template)
	if err != nil {
		log.Printf("Error while starting simulation: %v", err)
		return ""
	}
	return name
}

// Disconnect device.
func (d *DeviceUsecase) Disconnect() error {
	return d.repo.Device.Disconnect()
}

// Connect initiates connection and returns a keyboard name
func (d *DeviceUsecase) Connect() string {
	return d.repo.Device.Connect()
}

// GetPath returns current device path
func (d *DeviceUsecase) GetPath() string {
	return d.repo.Device.Get().Path
}

// GetFirmware returns current device firmware version
func (d *DeviceUsecase) GetFirmware() string {
	return d.repo.Device.Get().Firmware
}

// GetSupports returns current device supports
func (d *DeviceUsecase) GetSupports() *dto.Supports {
	return dto.SupportedCapabilities(d.repo.Device.Get().Capabilities)
}

// SavePreset initiates preset save process
func (d *DeviceUsecase) SaveState() error {
	dev := d.repo.Device.Get()
	path, err := runtime.SaveFileDialog(d.ctx, runtime.SaveDialogOptions{
		Title:           "Save state",
		DefaultFilename: string(dev.Name) + ".nuga.json",
	})
	if err != nil {
		return err
	}
	state, err := dump.Collect(dev.Handle)
	if err != nil {
		return err
	}
	return d.repo.State.WriteFile(path, dto.StateFile{
		Version: config.AppVersion,
		State:   &state,
	})
}

func (d *DeviceUsecase) RestoreState() error {
	path, err := runtime.OpenFileDialog(d.ctx, runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Nuga JSON dump",
				Pattern:     "*.json",
			},
		},
	})
	if err != nil {
		return err
	}
	if path == "" {
		return nil
	}
	state, err := d.repo.State.ReadFile(path)
	if err != nil {
		return err
	}
	dev := d.repo.Device.Get()
	if state.Name != dev.Name {
		return errors.ErrStateWrongDevice
	}
	return dump.Restore(dev.Handle, state.State)
}

func (d *DeviceUsecase) RestoreDefaultState() error {
	dev := d.repo.Device.Get()
	defaultState, err := dump.GetDefaults(dev.Name)
	if err != nil {
		return err
	}
	return dump.Restore(dev.Handle, defaultState)
}
