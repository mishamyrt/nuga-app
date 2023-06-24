package effect

var (
	SidelightOff = Mode{
		"Lights off",
		0,
		0,
	}
	SidelightRainbowStream = Mode{
		"Rainbow stream",
		1,
		Speed,
	}
	SidelightRainbow = Mode{
		"Rainbow",
		2,
		Speed,
	}
	SidelightFixed = Mode{
		"Fixed on",
		3,
		SpecificColor,
	}
	SidelightRespire = Mode{
		"Respire",
		4,
		SpecificColor | Speed,
	}
	SidelightNeonStream = Mode{
		"Neon stream",
		5,
		Speed,
	}
)

var Sidelight = Modes{
	SidelightOff,
	SidelightRainbowStream,
	SidelightRainbow,
	SidelightFixed,
	SidelightRespire,
	SidelightNeonStream,
}
