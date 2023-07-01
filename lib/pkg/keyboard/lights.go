package keyboard

import (
	"nuga/pkg/color"
	"nuga/pkg/hid"
)

type Lights struct {
	Handle hid.Handle
	Debug  bool
}

func (b *Lights) GetRawEffects() ([]byte, error) {
	var params []byte
	response, err := b.Handle.Request(CmdGetParams, 270)
	if err != nil {
		return params, err
	}
	return response, nil
}

func (b *Lights) GetEffects() (Effects, error) {
	raw, err := b.GetRawEffects()
	startOffset := 15
	paramsSubset := raw[startOffset : startOffset+ParamsLength]
	return ParseParams(
		paramsSubset,
	), err
}

func (b *Lights) GetRawColors() ([]byte, error) {
	var colors []byte
	colors, err := b.Handle.Request(CmdGetColors, 1050)
	if err != nil {
		return colors, err
	}
	return colors, err
}

func (b *Lights) GetColors() (ColorState, error) {
	raw, err := b.GetRawColors()
	colorSubset := raw[7 : len(raw)-18]
	return ParseColors(colorSubset), err
}

func (b *Lights) SetColors(c ColorState) error {
	request := make([]byte, 0)
	request = append(request, CmdSetColors...)
	request = append(request, c.Bytes()...)
	return b.Handle.Send(request)
}

func (b *Lights) ResetColors() error {
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
	return b.SetColors(state)
}

func (b *Lights) SetEffects(p Effects) error {
	currentParams, err := b.GetRawEffects()
	if err != nil {
		return err
	}
	paramsRequest := make([]byte, 0)
	paramsRequest = append(paramsRequest, CmdSetParams...)
	paramsRequest = append(paramsRequest, p.Bytes()...)
	paramsRequest = append(paramsRequest, currentParams...)
	paramsRequest = append(paramsRequest, make([]byte, 770)...)
	// return nil
	return b.Handle.Send(paramsRequest)
}

func Open() (Lights, error) {
	b := Lights{}
	handle, err := hid.OpenHandle()
	if err != nil {
		return b, err
	}
	b.Handle = handle
	return b, nil
}
