package light

// Controller is the basic interface that all light sources must implement
type Controller interface {
	GetEffects() (*Effects, error)
	SetEffects(p *Effects) error
	GetColors() (*ColorState, error)
	SetColors(c *ColorState) error
}
