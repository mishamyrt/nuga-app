package keyboard

// SimulationTemplate represents simulation data.
type SimulationTemplate struct {
	Colors []int
	Params []int
	Name   string
}

// SimulatedLights represents simulated lights.
type SimulatedLights struct {
	template SimulationTemplate
	effects  *Effects
	colors   *ColorState
}

func (s *SimulatedLights) setupEffects() {
	startOffset := 15
	paramsSubset := s.template.Params[startOffset : startOffset+ParamsLength]
	effects := ParseParams(
		intToBytes(paramsSubset),
	)
	s.effects = &effects
}

func (s *SimulatedLights) setupColors() {
	colorSubset := s.template.Colors[7 : len(s.template.Colors)-18]
	s.colors = ParseColors(
		intToBytes(colorSubset),
	)
}

// GetEffects returns current simulated effects.
func (s *SimulatedLights) GetEffects() (*Effects, error) {
	return s.effects, nil
}

// SetEffects sets current simulated effects.
func (s *SimulatedLights) SetEffects(p *Effects) error {
	s.effects = p
	return nil
}

// GetColors returns current simulated colors.
func (s *SimulatedLights) GetColors() (*ColorState, error) {
	return s.colors, nil
}

// SetColors sets current simulated colors.
func (s *SimulatedLights) SetColors(c *ColorState) error {
	s.colors = c
	return nil
}

// GetName returns simulated keyboard name.
func (s *SimulatedLights) GetName() (string, error) {
	return s.template.Name, nil
}

// GetPath returns simulated keyboard path.
func (s *SimulatedLights) GetPath() (string, error) {
	return "/simulated/device/path", nil
}

// OpenSimulation returns simulated light from template.
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
