package device

import "nuga/pkg/light"

func OpenSimulation(t light.SimulationTemplate) (*Device, error) {
	d, err := getDevice(t.Name)
	if err != nil {
		return nil, err
	}
	d.Light = light.OpenSimulation(t)
	d.Path = "/simulated/device/path"
	return d, nil
}
