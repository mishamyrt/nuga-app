// Package contains an example of how to use the nuga library
package main

import (
	"encoding/json"
	"fmt"
	"nuga/pkg/device"
	"nuga/pkg/light"
	"os"
)

func describe(d *device.Device) {
	fmt.Println("Device: " + d.Name)
	fmt.Println("Supported light domains:")
	for i := range d.LightDomains {
		fmt.Println("* " + d.LightDomains[i].Name)
	}
}

func openSimulation(tplPath string) (*device.Device, error) {
	content, err := os.ReadFile(tplPath)
	if err != nil {
		panic(err)
	}
	var t light.SimulationTemplate
	err = json.Unmarshal(content, &t)
	if err != nil {
		return nil, err
	}
	return device.OpenSimulation(t)
}

func main() {
	var d *device.Device
	var err error
	if len(os.Args) == 2 {
		fmt.Println("Loading simulation")
		d, err = openSimulation(os.Args[1])
	} else {
		d, err = device.Open()
	}
	if err != nil {
		panic(err)
	}
	describe(d)
}
