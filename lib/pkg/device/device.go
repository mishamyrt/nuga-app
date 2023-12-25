// Package device is the entrypoint for keyboard device control
package device

import (
	"nuga/pkg/hid"
	"nuga/pkg/light"
	"nuga/pkg/light/effect"
)

// Device represents keyboard with its controls
type Device struct {
	Name         string
	Layout       int
	Path         string
	Firmware     string
	Light        light.Controller
	LightDomains []effect.Domain
	handle       *hid.Handle
}

// Close connection with hid device
func (d *Device) Close() error {
	if d.handle == nil {
		return nil
	}
	return d.handle.Close()
}

// GetEffects returns keyboard effects.
func (d *Device) GetEffects() (*light.Effects, error) {
	return d.Light.GetEffects()
}

// SetEffects sets keyboard effects.
func (d *Device) SetEffects(p *light.Effects) error {
	return d.Light.SetEffects(p)
}

// GetColors returns keyboard colors state.
func (d *Device) GetColors() (*light.ColorState, error) {
	return d.Light.GetColors()
}

// SetColors sets keyboard color state.
func (d *Device) SetColors(c *light.ColorState) error {
	return d.Light.SetColors(c)
}

// Open real keyboard USB handle
func Open() (*Device, error) {
	handle, err := hid.OpenHandle()
	if err != nil {
		return nil, err
	}
	info, err := handle.GetInfo()
	if err != nil {
		return nil, err
	}
	d, err := getDevice(info.Name)
	if err != nil {
		return nil, err
	}
	d.Path = info.Path
	d.Firmware = info.Firmware
	d.Light = light.OpenK916(handle)
	if err != nil {
		return nil, err
	}
	d.handle = handle
	return d, nil
}
