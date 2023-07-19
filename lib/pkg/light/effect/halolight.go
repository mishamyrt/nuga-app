package effect

var (
	// HalolightOff represents keyboard halolight off mode.
	HalolightOff = Mode{
		"Lights off",
		0,
		0,
	}
	// HalolightRainbowWheel represents keyboard halolight rainbow wheel mode.
	HalolightRainbowWheel = Mode{
		"Rainbow wheel",
		1,
		Speed,
	}
	// HalolightRainbow represents keyboard halolight rainbow mode.
	HalolightRainbow = Mode{
		"Rainbow",
		2,
		Speed,
	}
	// HalolightFixed represents keyboard halolight fixed mode.
	HalolightFixed = Mode{
		"Fixed",
		3,
		SpecificColor,
	}
	// HalolightRespire represents keyboard halolight respire mode.
	HalolightRespire = Mode{
		"Respire",
		4,
		SpecificColor | Speed,
	}
)

// Halo is a domain for halolight effects.
var Halo = Domain{
	Name: "Halo",
	Modes: []Mode{
		HalolightOff,
		HalolightRainbowWheel,
		HalolightRainbow,
		HalolightFixed,
		HalolightRespire,
	},
}
