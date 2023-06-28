package color

type RGB struct {
	R, G, B uint8
	random  bool
}

func (c *RGB) IsRandom() bool {
	return c.random
}

var Random = RGB{
	random: true,
}

func New(r, g, b uint8) RGB {
	return RGB{
		r, g, b, false,
	}
}
