package light

// SimulationTemplate represents simulation data.
type SimulationTemplate struct {
	Colors []int
	Params []int
	Name   string
}

// ControllerSimulation represents simulated light.
type ControllerSimulation struct {
	template SimulationTemplate
	effects  *Effects
	colors   *ColorState
}

func (d *ControllerSimulation) setupEffects() {
	startOffset := 15
	paramsSubset := d.template.Params[startOffset : startOffset+ParamsLength]
	effects := ParseParams(
		intToBytes(paramsSubset),
	)
	d.effects = effects
}

func (d *ControllerSimulation) setupColors() {
	colorSubset := d.template.Colors[7 : len(d.template.Colors)-18]
	d.colors = ParseColors(
		intToBytes(colorSubset),
	)
}

// GetEffects returns current simulated effect.
func (d *ControllerSimulation) GetEffects() (*Effects, error) {
	return d.effects, nil
}

// SetEffects sets current simulated effect.
func (d *ControllerSimulation) SetEffects(p *Effects) error {
	d.effects = p
	return nil
}

// GetColors returns current simulated color.
func (d *ControllerSimulation) GetColors() (*ColorState, error) {
	return d.colors, nil
}

// SetColors sets current simulated color.
func (d *ControllerSimulation) SetColors(c *ColorState) error {
	d.colors = c
	return nil
}

// OpenSimulation returns simulated light from template.
func OpenSimulation(t SimulationTemplate) Controller {
	var lights Controller
	var d ControllerSimulation
	d.template = t
	d.setupEffects()
	d.setupColors()
	lights = &d
	return lights
}

func intToBytes(v []int) []byte {
	bytes := make([]byte, len(v))
	for i := range v {
		bytes[i] = byte(v[i])
	}
	return bytes
}
