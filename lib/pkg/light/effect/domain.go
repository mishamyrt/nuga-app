package effect

// Modes is a list of keyboard mode
type Domain struct {
	Name  string
	Modes []Mode
}

// Find mode in list. Returns nil if not found
func (d *Domain) Find(code byte) *Mode {
	for i := range d.Modes {
		if d.Modes[i].Code == code {
			return &d.Modes[i]
		}
	}
	return nil
}
