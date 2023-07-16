package light

// Device is the basic interface that all light sources must implement
type Device interface {
	GetEffects() (*Effects, error)
	SetEffects(p *Effects) error
	GetColors() (*ColorState, error)
	SetColors(c *ColorState) error
	GetName() (string, error)
	GetPath() (string, error)
}
