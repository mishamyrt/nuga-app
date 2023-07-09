package keyboard

import (
	"nuga/pkg/color"
	"nuga/pkg/hid"
)

// HardwareLights represents real keyboard lights.
type HardwareLights struct {
	Handle *hid.Handle
}

// GetName returns keyboard name.
func (h *HardwareLights) GetName() (string, error) {
	return h.Handle.Device.GetProductStr()
}

// GetPath returns keyboard path.
func (h *HardwareLights) GetPath() (string, error) {
	info, err := h.Handle.Device.GetDeviceInfo()
	if err != nil {
		return "", err
	}
	return info.Path, nil
}

// GetRawEffects returns raw effects data.
func (h *HardwareLights) GetRawEffects() ([]byte, error) {
	response, err := h.Handle.Request(CmdGetParams, 270)
	if err != nil {
		return []byte{}, err
	}
	return response, nil
}

// GetEffectsBuffer returns trimmed effects buffer.
func (h *HardwareLights) GetEffectsBuffer() ([]byte, error) {
	raw, err := h.GetRawEffects()
	if err != nil {
		return []byte{}, err
	}
	startOffset := 15
	return raw[startOffset : startOffset+ParamsLength], nil
}

// GetEffects returns keyboard effects.
func (h *HardwareLights) GetEffects() (*Effects, error) {
	params, err := h.GetEffectsBuffer()
	if err != nil {
		return nil, err
	}
	effects := ParseParams(params)
	return &effects, err
}

// GetRawColors returns raw keyboard colors.
func (h *HardwareLights) GetRawColors() ([]byte, error) {
	var colors []byte
	colors, err := h.Handle.Request(CmdGetColors, 1050)
	if err != nil {
		return colors, err
	}
	return colors, err
}

// GetColors returns keyboard colors state.
func (h *HardwareLights) GetColors() (*ColorState, error) {
	raw, err := h.GetRawColors()
	if err != nil {
		return nil, err
	}
	colorSubset := raw[7 : len(raw)-18]
	return ParseColors(colorSubset), err
}

// SetColors sets keyboard color state.
func (h *HardwareLights) SetColors(c *ColorState) error {
	request := make([]byte, 0)
	request = append(request, CmdSetColors...)
	request = append(request, c.Bytes()...)
	return h.Handle.SendWithRetries(request)
}

// ResetColors resets colors to defaults.
func (h *HardwareLights) ResetColors() error {
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
	return h.SetColors(&state)
}

// SetEffects sets keyboard effects.
func (h *HardwareLights) SetEffects(p *Effects) error {
	currentParams, err := h.GetEffectsBuffer()
	if err != nil {
		return err
	}
	paramsRequest := make([]byte, 0)
	paramsRequest = append(paramsRequest, CmdSetParams...)
	paramsRequest = append(paramsRequest, p.Bytes()...)
	paramsRequest = append(paramsRequest, currentParams...)
	paramsRequest = append(paramsRequest, make([]byte, 770)...)
	// return nil
	return h.Handle.SendWithRetries(paramsRequest)
}

// OpenHardware opens real keyboard lights.
func OpenHardware() (HardwareLights, error) {
	var h HardwareLights
	handle, err := hid.OpenHandle()
	if err != nil {
		return h, err
	}
	h.Handle = handle
	return h, nil
}

// Open hardware keyboard lights as Lights.
func Open() (Lights, error) {
	var lights Lights
	h, err := OpenHardware()
	if err != nil {
		return lights, err
	}
	lights = &h
	return lights, nil
}
