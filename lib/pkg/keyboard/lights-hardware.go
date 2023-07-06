package keyboard

import (
	"nuga/pkg/color"
	"nuga/pkg/hid"
)

type HardwareLights struct {
	Handle *hid.Handle
}

func (h *HardwareLights) GetName() (string, error) {
	return h.Handle.Device.GetProductStr()
}

func (h *HardwareLights) GetPath() (string, error) {
	info, err := h.Handle.Device.GetDeviceInfo()
	if err != nil {
		return "", err
	}
	return info.Path, nil
}

func (h *HardwareLights) GetRawEffects() ([]byte, error) {
	response, err := h.Handle.Request(CmdGetParams, 270)
	if err != nil {
		return []byte{}, err
	}
	return response, nil
}

func (h *HardwareLights) GetEffectsBuffer() ([]byte, error) {
	raw, err := h.GetRawEffects()
	if err != nil {
		return []byte{}, err
	}
	startOffset := 15
	return raw[startOffset : startOffset+ParamsLength], nil
}

func (h *HardwareLights) GetEffects() (Effects, error) {
	params, err := h.GetEffectsBuffer()
	return ParseParams(
		params,
	), err
}

func (h *HardwareLights) GetRawColors() ([]byte, error) {
	var colors []byte
	colors, err := h.Handle.Request(CmdGetColors, 1050)
	if err != nil {
		return colors, err
	}
	return colors, err
}

func (h *HardwareLights) GetColors() (ColorState, error) {
	raw, err := h.GetRawColors()
	colorSubset := raw[7 : len(raw)-18]
	return ParseColors(colorSubset), err
}

func (h *HardwareLights) SetColors(c ColorState) error {
	request := make([]byte, 0)
	request = append(request, CmdSetColors...)
	request = append(request, c.Bytes()...)
	return h.Handle.Send(request)
}

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
	return h.SetColors(state)
}

func (h *HardwareLights) SetEffects(p Effects) error {
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
	return h.Handle.Send(paramsRequest)
}

func OpenHardware() (HardwareLights, error) {
	var h HardwareLights
	handle, err := hid.OpenHandle()
	if err != nil {
		return h, err
	}
	h.Handle = handle
	return h, nil
}

func Open() (Lights, error) {
	var lights Lights
	h, err := OpenHardware()
	if err != nil {
		return lights, err
	}
	lights = &h
	return lights, nil
}
