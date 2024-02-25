// Package device contains device repository
package device

import (
	"github.com/mishamyrt/nuga-lib"
	"github.com/mishamyrt/nuga-lib/dump"
)

// Repository represents device repository
type Repository struct {
	dev *nuga.Device
}

// New creates device repository
func New() *Repository {
	return &Repository{}
}

// IsConnected checks if device is connected
func (r *Repository) IsConnected() bool {
	return r.dev != nil
}

// Get returns device instance
func (r *Repository) Get() *nuga.Device {
	return r.dev
}

// Connect to device
func (r *Repository) Connect() string {
	var err error
	if r.dev == nil {
		r.dev, err = nuga.Open()
		if err != nil {
			return ""
		}
	}
	return string(r.dev.Name)
}

// Disconnect from device
func (r *Repository) Disconnect() error {
	if !r.IsConnected() {
		return nil
	}
	err := r.dev.Close()
	r.dev = nil
	return err
}

// Simulate connection with device
func (r *Repository) Simulate(template *dump.State) (string, error) {
	dev, err := dump.OpenSimulation(template)
	if err != nil {
		return "", err
	}
	r.dev = dev
	return string(dev.Name), nil
}
