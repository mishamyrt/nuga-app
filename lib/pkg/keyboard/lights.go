package keyboard

type Lights interface {
	GetEffects() (*Effects, error)
	SetEffects(p *Effects) error
	GetColors() (*ColorState, error)
	SetColors(c *ColorState) error
	GetName() (string, error)
	GetPath() (string, error)
}
