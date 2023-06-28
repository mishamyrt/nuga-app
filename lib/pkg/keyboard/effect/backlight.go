package effect

var (
	BacklightOff = Mode{
		"Lights off",
		0,
		0,
	}
	BacklightFixed = Mode{
		"Fixed on",
		1,
		SpecificColor | RandomColor,
	}
	BacklightRespire = Mode{
		"Respire",
		2,
		SpecificColor | RandomColor | Speed,
	}
	BacklightRainbow = Mode{
		"Rainbow",
		3,
		Speed,
	}
	BacklightFlashAway = Mode{
		"Flash away",
		4,
		SpecificColor | RandomColor | Speed,
	}
	// RaindropsBacklightMode = Mode{
	// 	"Raindrops",
	// 	5,
	// 	SpecificColor | RandomColor | Speed,
	// }
	BacklightRainbowWheel = Mode{
		"Rainbow wheel",
		6,
		SpecificColor | RandomColor | Speed,
	}
	BacklightRipplesShining = Mode{
		"Ripples shining",
		7,
		SpecificColor | RandomColor | Speed,
	}
	BacklightStarsTwinkle = Mode{
		"Stars twinkle",
		8,
		SpecificColor | RandomColor | Speed,
	}
	// ShadowDisappearBacklightMode = Mode{
	// 	"Shadow disappear",
	// 	9,
	// 	SpecificColor | RandomColor | Speed,
	// }
	// RetroSnakeBacklightMode = Mode{
	// 	"Retro snake",
	// 	10,
	// 	SpecificColor | RandomColor | Speed,
	// }
	BacklightNeonStream = Mode{
		"Neon stream",
		11,
		SpecificColor | RandomColor | Speed,
	}
	BacklightReaction = Mode{
		"Reaction",
		12,
		SpecificColor | RandomColor | Speed,
	}
	BacklightSineWave = Mode{
		"Sine wave",
		13,
		SpecificColor | RandomColor | Speed,
	}
	// RetinueScanningBacklightMode = Mode{
	// 	"Retinue scanning",
	// 	14,
	// 	SpecificColor | RandomColor | Speed,
	// }
	BacklightRotatingWindmill = Mode{
		"Rotating windmill",
		15,
		Speed,
	}
	BacklightColorfulWaterfall = Mode{
		"Colorful waterfall",
		16,
		Speed,
	}
	BacklightBlossoming = Mode{
		"Colorful waterfall",
		17,
		Speed,
	}
	BacklightGame = Mode{
		"Game",
		18,
		0,
	}
)

var Backlight = Modes{
	BacklightOff,
	BacklightFixed,
	BacklightRespire,
	BacklightRainbow,
	BacklightFlashAway,
	BacklightRainbowWheel,
	BacklightRipplesShining,
	BacklightStarsTwinkle,
	BacklightNeonStream,
	BacklightReaction,
	BacklightSineWave,
	BacklightRotatingWindmill,
	BacklightColorfulWaterfall,
	BacklightBlossoming,
	BacklightGame,
}
