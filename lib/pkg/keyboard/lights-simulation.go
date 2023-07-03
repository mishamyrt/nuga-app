package keyboard

type SimulationTemplate struct {
	Colors []int
	Params []int
	Name   string
}

type SimulatedLights struct {
	template SimulationTemplate
	effects  Effects
	colors   ColorState
}

func (s *SimulatedLights) setupEffects() {
	startOffset := 15
	paramsSubset := s.template.Params[startOffset : startOffset+ParamsLength]
	s.effects = ParseParams(
		intToBytes(paramsSubset),
	)
}

func (s *SimulatedLights) setupColors() {
	colorSubset := s.template.Colors[7 : len(s.template.Colors)-18]
	s.colors = ParseColors(
		intToBytes(colorSubset),
	)
}

func (s *SimulatedLights) GetEffects() (Effects, error) {
	return s.effects, nil
}

func (s *SimulatedLights) SetEffects(p Effects) error {
	s.effects = p
	return nil
}

func (s *SimulatedLights) GetColors() (ColorState, error) {
	return s.colors, nil
}

func (s *SimulatedLights) SetColors(c ColorState) error {
	s.colors = c
	return nil
}

func (s *SimulatedLights) GetName() (string, error) {
	return s.template.Name, nil
}

func (h *SimulatedLights) GetPath() (string, error) {
	return "/simulated/device/path", nil
}

func OpenSimulation(t SimulationTemplate) Lights {
	var lights Lights
	var s SimulatedLights
	s.template = t
	s.setupEffects()
	s.setupColors()
	lights = &s
	return lights
}

func intToBytes(v []int) []byte {
	bytes := make([]byte, len(v))
	for i := range v {
		bytes[i] = byte(v[i])
	}
	return bytes
}
