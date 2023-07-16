package light

// SimulationTemplate represents simulation data.
type SimulationTemplate struct {
	Colors []int
	Params []int
	Name   string
}

// DeviceSimulation represents simulated lightd.
type DeviceSimulation struct {
	template SimulationTemplate
	effects  *Effects
	colors   *ColorState
}

func (d *DeviceSimulation) setupEffects() {
	startOffset := 15
	paramsSubset := d.template.Params[startOffset : startOffset+ParamsLength]
	effects := ParseParams(
		intToBytes(paramsSubset),
	)
	d.effects = &effects
}

func (d *DeviceSimulation) setupColors() {
	colorSubset := d.template.Colors[7 : len(d.template.Colors)-18]
	d.colors = ParseColors(
		intToBytes(colorSubset),
	)
}

// GetEffects returns current simulated effectd.
func (d *DeviceSimulation) GetEffects() (*Effects, error) {
	return d.effects, nil
}

// SetEffects sets current simulated effectd.
func (d *DeviceSimulation) SetEffects(p *Effects) error {
	d.effects = p
	return nil
}

// GetColors returns current simulated colord.
func (d *DeviceSimulation) GetColors() (*ColorState, error) {
	return d.colors, nil
}

// SetColors sets current simulated colord.
func (d *DeviceSimulation) SetColors(c *ColorState) error {
	d.colors = c
	return nil
}

// GetName returns simulated keyboard name.
func (d *DeviceSimulation) GetName() (string, error) {
	return d.template.Name, nil
}

// GetPath returns simulated keyboard path.
func (d *DeviceSimulation) GetPath() (string, error) {
	return "/simulated/device/path", nil
}

// OpenSimulation returns simulated light from template.
func OpenSimulation(t SimulationTemplate) Device {
	var lights Device
	var d DeviceSimulation
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
