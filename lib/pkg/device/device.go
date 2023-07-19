package device

import (
	"nuga/pkg/hid"
	"nuga/pkg/light"
	"nuga/pkg/light/effect"
)

type Device struct {
	Name         string
	Layout       int
	Path         string
	Light        light.Controller
	LightDomains []effect.Domain
}

func (d *Device) GetEffects() (*light.Effects, error) {
	return d.Light.GetEffects()
}

func (d *Device) SetEffects(p *light.Effects) error {
	return d.Light.SetEffects(p)
}

func (d *Device) GetColors() (*light.ColorState, error) {
	return d.Light.GetColors()
}

func (d *Device) SetColors(c *light.ColorState) error {
	return d.Light.SetColors(c)
}

func Open() (*Device, error) {
	handle, err := hid.OpenHandle()
	if err != nil {
		return nil, err
	}
	name, err := handle.GetName()
	if err != nil {
		return nil, err
	}
	d, err := getDevice(name)
	if err != nil {
		return nil, err
	}
	d.Path, err = handle.GetPath()
	d.Light = light.OpenK916(handle)
	if err != nil {
		return nil, err
	}
	return d, nil
}
