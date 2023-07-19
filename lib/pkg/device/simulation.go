package device

import "nuga/pkg/light"

// OpenSimulation opens not real keyboard from template (for testing)
func OpenSimulation(t light.SimulationTemplate) (*Device, error) {
	d, err := getDevice(t.Name)
	if err != nil {
		return nil, err
	}
	d.Light = light.OpenSimulation(t)
	d.Path = "/simulated/device/path"
	return d, nil
}
