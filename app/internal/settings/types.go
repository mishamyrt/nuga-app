package settings

// Content represents settings content
type Content struct {
	OSMode             string `json:"osMode"`
	IndividualSettings bool   `json:"individual"`
	UI                 string `json:"ui"`
	Theme              string `json:"theme"`
}
