package keyboard

// Lights is the basic interface that all light sources must implement
type Lights interface {
	GetEffects() (*Effects, error)
	SetEffects(p *Effects) error
	GetColors() (*ColorState, error)
	SetColors(c *ColorState) error
	GetName() (string, error)
	GetPath() (string, error)
}
