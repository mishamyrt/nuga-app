package effect

var (
	// SidelightOff represents keyboard sidelight off mode.
	SidelightOff = Mode{
		"Lights off",
		0,
		0,
	}
	// SidelightRainbowStream represents keyboard sidelight rainbow stream mode.
	SidelightRainbowStream = Mode{
		"Rainbow stream",
		1,
		Speed,
	}
	// SidelightRainbow represents keyboard sidelight rainbow mode.
	SidelightRainbow = Mode{
		"Rainbow",
		2,
		Speed,
	}
	// SidelightFixed represents keyboard sidelight fixed mode.
	SidelightFixed = Mode{
		"Fixed on",
		3,
		SpecificColor,
	}
	// SidelightRespire represents keyboard sidelight respire mode.
	SidelightRespire = Mode{
		"Respire",
		4,
		SpecificColor | Speed,
	}
	// SidelightNeonStream represents keyboard sidelight neon stream mode.
	SidelightNeonStream = Mode{
		"Neon stream",
		5,
		Speed,
	}
)

// Sidelight is a list of sidelight effects.
var Sidelight = Modes{
	SidelightOff,
	SidelightRainbowStream,
	SidelightRainbow,
	SidelightFixed,
	SidelightRespire,
	SidelightNeonStream,
}
