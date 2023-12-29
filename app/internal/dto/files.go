package dto

import "github.com/wailsapp/wails/v2/pkg/runtime"

var SimulationFileFilter = []runtime.FileFilter{
	{
		DisplayName: "Simulation file",
		Pattern:     "*.simulation.json",
	},
}

var LightsPresetFileFilter = []runtime.FileFilter{
	{
		DisplayName: "Lights preset file",
		Pattern:     "*.lights.json",
	},
}
