package effect

// Domain is a type of keyboard lights with its mode
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
