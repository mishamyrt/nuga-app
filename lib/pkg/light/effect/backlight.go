// Package effect contains presets of keyboard light effects
package effect

var (
	// BacklightOff represents keyboard backlight off mode.
	BacklightOff = Mode{
		"Lights off",
		0,
		0,
	}
	// BacklightStatic represents keyboard backlight fixed mode.
	BacklightStatic = Mode{
		"Static",
		1,
		SpecificColor | RandomColor,
	}
	// BacklightRespire represents keyboard backlight respire mode.
	BacklightRespire = Mode{
		"Respire",
		2,
		SpecificColor | RandomColor | Speed,
	}
	// BacklightRainbow represents keyboard backlight rainbow mode.
	BacklightRainbow = Mode{
		"Rainbow",
		3,
		Speed,
	}
	// BacklightFlashAway represents keyboard backlight flash away mode.
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

	// BacklightRainbowWheel represents keyboard backlight rainbow wheel mode.
	BacklightRainbowWheel = Mode{
		"Rainbow wheel",
		6,
		SpecificColor | RandomColor | Speed,
	}
	// BacklightRipplesShining represents keyboard backlight ripples shining mode.
	BacklightRipplesShining = Mode{
		"Ripples shining",
		7,
		SpecificColor | RandomColor | Speed,
	}
	// BacklightStarsTwinkle represents keyboard backlight ripples shining mode.
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

	// BacklightNeonStream represents keyboard backlight neon stream mode.
	BacklightNeonStream = Mode{
		"Neon stream",
		11,
		SpecificColor | RandomColor | Speed,
	}
	// BacklightReaction represents keyboard backlight reaction mode.
	BacklightReaction = Mode{
		"Reaction",
		12,
		SpecificColor | RandomColor | Speed,
	}
	// BacklightSineWave represents keyboard backlight sine wave mode.
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

	// BacklightRotatingWindmill represents keyboard backlight rotating windmill mode.
	BacklightRotatingWindmill = Mode{
		"Rotating windmill",
		15,
		Speed,
	}
	// BacklightColorfulWaterfall represents keyboard backlight colorful waterfall mode.
	BacklightColorfulWaterfall = Mode{
		"Colorful waterfall",
		16,
		Speed,
	}
	// BacklightBlossoming represents keyboard backlight blossoming mode.
	BacklightBlossoming = Mode{
		"Blossoming",
		17,
		Speed,
	}
	// BacklightCustom represents keyboard backlight game mode.
	BacklightCustom = Mode{
		"Custom",
		18,
		0,
	}
)

// Backlight is a list of backlight effects.
var Backlight = Domain{
	Name: "Backlight",
	Modes: []Mode{
		BacklightOff,
		BacklightStatic,
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
		BacklightCustom,
	},
}
