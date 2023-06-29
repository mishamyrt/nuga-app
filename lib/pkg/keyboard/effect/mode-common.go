package effect

type Mode struct {
	Name     string
	Code     byte
	Features Feature
}

type Modes []Mode

func (m Modes) Find(code byte) *Mode {
	for i := range m {
		if m[i].Code == code {
			return &m[i]
		}
	}
	return nil
}
