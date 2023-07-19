package device

import (
	"nuga/pkg/light/effect"
	"strings"
)

// SupportedDevices contains nuga supported keyboard list with its features
var SupportedDevices = []Device{
	{
		Name:   "Halo75",
		Layout: 75,
		LightDomains: []effect.Domain{
			effect.Backlight,
			effect.Halo,
			effect.Sidelight,
		},
	},
	{
		Name:   "Halo65",
		Layout: 65,
		LightDomains: []effect.Domain{
			effect.Backlight,
			effect.Halo,
		},
	},
}

const vendorPrefix = "NuPhy "

func getDevice(rawName string) (*Device, error) {
	if !strings.HasPrefix(rawName, vendorPrefix) {
		return nil, ErrWrongVendor
	}
	name := strings.TrimPrefix(rawName, vendorPrefix)
	var device *Device
	for i := range SupportedDevices {
		if SupportedDevices[i].Name == name {
			device = &SupportedDevices[i]
		}
	}
	if device == nil {
		return nil, ErrNotSupported
	}
	return device, nil
}
