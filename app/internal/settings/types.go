package settings

// App represents app settings content
type App struct {
	UI    string `json:"ui"`
	Theme string `json:"theme"`
}

// Mode represents mode settings content
type Mode struct {
	OSMode             string `json:"osMode"`
	IndividualSettings bool   `json:"individual"`
}

// Content represents settings content
type Content struct {
	Mode Mode `json:"mode"`
	App  App  `json:"app"`
}
