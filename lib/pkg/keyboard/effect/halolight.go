package effect

var (
	HalolightOff = Mode{
		"Lights off",
		0,
		0,
	}
	HalolightRainbowWheel = Mode{
		"Rainbow wheel",
		1,
		Speed,
	}
	HalolightRainbow = Mode{
		"Rainbow",
		2,
		RandomColor | Speed,
	}
	HalolightFixed = Mode{
		"Fixed",
		3,
		SpecificColor | Speed,
	}
	HalolightRespire = Mode{
		"Respire",
		4,
		SpecificColor | Speed,
	}
)

var Halo = Modes{
	HalolightOff,
	HalolightRainbowWheel,
	HalolightRainbow,
	HalolightFixed,
	HalolightRespire,
}
