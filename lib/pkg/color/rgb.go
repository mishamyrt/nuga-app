package color

type RGB struct {
	R, G, B uint8
}

func New(r, g, b uint8) RGB {
	return RGB{
		r, g, b,
	}
}
