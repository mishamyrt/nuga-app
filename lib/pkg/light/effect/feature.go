package effect

// Feature represents effect feature bitmap
type Feature byte

type predicate func(f Feature) bool

func (f Feature) assert(features []Feature, assert predicate, defaultExit bool) bool {
	for i := range features {
		if assert(features[i]) {
			return !defaultExit
		}
	}
	return defaultExit
}

// Supports checks if feature is supported.
func (f Feature) Supports(features ...Feature) bool {
	return f.assert(features, func(feature Feature) bool {
		return f&feature == 0
	}, true)
}

// SupportsAny checks if any of features is supported.
func (f Feature) SupportsAny(features ...Feature) bool {
	return f.assert(features, func(feature Feature) bool {
		return f&feature != 0
	}, false)
}

const (
	// SpecificColor flag indicates that mode supports specific color.
	SpecificColor Feature = 1 << iota
	// RandomColor flag indicates that mode supports random color
	RandomColor = 2 << iota
	// Speed flag indicates that mode supports speed.
	Speed = 4 << iota
)
