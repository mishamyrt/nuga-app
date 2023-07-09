package effect

// Mode represents keyboard light mode
type Mode struct {
	Name     string
	Code     byte
	Features Feature
}

// Modes is a list of keyboard mode
type Modes []Mode

// Find mode in list. Returns nil if not found
func (m Modes) Find(code byte) *Mode {
	for i := range m {
		if m[i].Code == code {
			return &m[i]
		}
	}
	return nil
}
