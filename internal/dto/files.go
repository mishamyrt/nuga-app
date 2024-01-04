package dto

import "github.com/wailsapp/wails/v2/pkg/runtime"

// SimulationFileFilter represents file filter for simulation files.
var SimulationFileFilter = []runtime.FileFilter{
	{
		DisplayName: "Simulation file",
		Pattern:     "*.simulation.json",
	},
}

// LightsPresetFileFilter represents file filter for lights preset files.
var LightsPresetFileFilter = []runtime.FileFilter{
	{
		DisplayName: "Lights preset file",
		Pattern:     "*.lights.json",
	},
}
