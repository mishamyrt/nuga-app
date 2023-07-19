package light

import (
	"nuga/pkg/color"
	"nuga/pkg/hid"
)

// K916Controller represents NuPhy BYK916 keyboard lights controller.
type K916Controller struct {
	Handle *hid.Handle
}

// GetPath returns keyboard path.
func (d *K916Controller) GetPath() (string, error) {
	info, err := d.Handle.Device.GetDeviceInfo()
	if err != nil {
		return "", err
	}
	return info.Path, nil
}

// GetRawEffects returns raw effects data.
func (d *K916Controller) GetRawEffects() ([]byte, error) {
	response, err := d.Handle.Request(CmdGetParams, 270)
	if err != nil {
		return []byte{}, err
	}
	return response, nil
}

// GetEffectsBuffer returns trimmed effects buffer.
func (d *K916Controller) GetEffectsBuffer() ([]byte, error) {
	raw, err := d.GetRawEffects()
	if err != nil {
		return []byte{}, err
	}
	startOffset := 15
	return raw[startOffset : startOffset+ParamsLength], nil
}

// GetEffects returns keyboard effects.
func (d *K916Controller) GetEffects() (*Effects, error) {
	params, err := d.GetEffectsBuffer()
	if err != nil {
		return nil, err
	}
	effects := ParseParams(params)
	return effects, err
}

// GetRawColors returns raw keyboard colors.
func (d *K916Controller) GetRawColors() ([]byte, error) {
	var colors []byte
	colors, err := d.Handle.Request(CmdGetColors, 1050)
	if err != nil {
		return colors, err
	}
	return colors, err
}

// GetColors returns keyboard colors state.
func (d *K916Controller) GetColors() (*ColorState, error) {
	raw, err := d.GetRawColors()
	if err != nil {
		return nil, err
	}
	colorSubset := raw[7 : len(raw)-18]
	return ParseColors(colorSubset), err
}

// SetColors sets keyboard color state.
func (d *K916Controller) SetColors(c *ColorState) error {
	request := make([]byte, 0)
	request = append(request, CmdSetColors...)
	request = append(request, c.Bytes()...)
	return d.Handle.SendWithRetries(request)
}

// ResetColors resets colors to defaults.
func (d *K916Controller) ResetColors() error {
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
func (d *K916Controller) SetEffects(p *Effects) error {
	currentParams, err := d.GetEffectsBuffer()
	if err != nil {
		return err
	}
	paramsRequest := make([]byte, 0)
	paramsRequest = append(paramsRequest, CmdSetParams...)
	paramsRequest = append(paramsRequest, p.Bytes()...)
	paramsRequest = append(paramsRequest, currentParams...)
	paramsRequest = append(paramsRequest, make([]byte, 770)...)
	return d.Handle.SendWithRetries(paramsRequest)
}

// OpenK916 opens BYK916 NuPhy keyboard lights.
func OpenK916(handle *hid.Handle) Controller {
	var lights Controller = &K916Controller{
		Handle: handle,
	}
	return lights
}

// // OpenHardware opens real keyboard lights.
// func OpenHardware() (*HardwareController, error) {
// 	var d HardwareController
// 	handle, err := hid.OpenHandle()
// 	if err != nil {
// 		return nil, err
// 	}
// 	d.Handle = handle
// 	return &d, nil
// }

// // Open hardware keyboard lights as Lights.
// func Open() (Controller, error) {
// 	var lights Controller
// 	h, err := OpenHardware()
// 	if err != nil {
// 		return nil, err
// 	}
// 	lights = h
// 	return lights, nil
// }
