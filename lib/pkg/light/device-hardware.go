package light

import (
	"nuga/pkg/color"
	"nuga/pkg/hid"
)

// DeviceHardware represents real keyboard lights.
type DeviceHardware struct {
	Handle *hid.Handle
}

// GetName returns keyboard name.
func (d *DeviceHardware) GetName() (string, error) {
	return d.Handle.Device.GetProductStr()
}

// GetPath returns keyboard patd.
func (d *DeviceHardware) GetPath() (string, error) {
	info, err := d.Handle.Device.GetDeviceInfo()
	if err != nil {
		return "", err
	}
	return info.Path, nil
}

// GetRawEffects returns raw effects data.
func (d *DeviceHardware) GetRawEffects() ([]byte, error) {
	response, err := d.Handle.Request(CmdGetParams, 270)
	if err != nil {
		return []byte{}, err
	}
	return response, nil
}

// GetEffectsBuffer returns trimmed effects buffer.
func (d *DeviceHardware) GetEffectsBuffer() ([]byte, error) {
	raw, err := d.GetRawEffects()
	if err != nil {
		return []byte{}, err
	}
	startOffset := 15
	return raw[startOffset : startOffset+ParamsLength], nil
}

// GetEffects returns keyboard effects.
func (d *DeviceHardware) GetEffects() (*Effects, error) {
	params, err := d.GetEffectsBuffer()
	if err != nil {
		return nil, err
	}
	effects := ParseParams(params)
	return &effects, err
}

// GetRawColors returns raw keyboard colors.
func (d *DeviceHardware) GetRawColors() ([]byte, error) {
	var colors []byte
	colors, err := d.Handle.Request(CmdGetColors, 1050)
	if err != nil {
		return colors, err
	}
	return colors, err
}

// GetColors returns keyboard colors state.
func (d *DeviceHardware) GetColors() (*ColorState, error) {
	raw, err := d.GetRawColors()
	if err != nil {
		return nil, err
	}
	colorSubset := raw[7 : len(raw)-18]
	return ParseColors(colorSubset), err
}

// SetColors sets keyboard color state.
func (d *DeviceHardware) SetColors(c *ColorState) error {
	request := make([]byte, 0)
	request = append(request, CmdSetColors...)
	request = append(request, c.Bytes()...)
	return d.Handle.SendWithRetries(request)
}

// ResetColors resets colors to defaults.
func (d *DeviceHardware) ResetColors() error {
	var state ColorState
	for i := range state {
		state[i][0] = color.Red
		state[i][1] = color.Green
		state[i][2] = color.Blue
		state[i][3] = color.Yellow
		state[i][4] = color.Purple
		state[i][5] = color.Cyan
		state[i][6] = color.White
	}
	return d.SetColors(&state)
}

// SetEffects sets keyboard effects.
func (d *DeviceHardware) SetEffects(p *Effects) error {
	currentParams, err := d.GetEffectsBuffer()
	if err != nil {
		return err
	}
	paramsRequest := make([]byte, 0)
	paramsRequest = append(paramsRequest, CmdSetParams...)
	paramsRequest = append(paramsRequest, p.Bytes()...)
	paramsRequest = append(paramsRequest, currentParams...)
	paramsRequest = append(paramsRequest, make([]byte, 770)...)
	// return nil
	return d.Handle.SendWithRetries(paramsRequest)
}

// OpenHardware opens real keyboard lights.
func OpenHardware() (DeviceHardware, error) {
	var d DeviceHardware
	handle, err := hid.OpenHandle()
	if err != nil {
		return d, err
	}
	d.Handle = handle
	return d, nil
}

// Open hardware keyboard lights as Lights.
func Open() (Device, error) {
	var lights Device
	h, err := OpenHardware()
	if err != nil {
		return lights, err
	}
	lights = &h
	return lights, nil
}
