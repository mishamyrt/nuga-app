package cmd

import (
	"errors"
	"fmt"
	"log"
	"nuga/pkg/hid"
	"nuga/pkg/keyboard"
	"os"

	"github.com/spf13/cobra"
)

// AppName represents app name.
const AppName = "nuga"

// Version represents current app version.
var Version = "development"

// rootCmd represents the base command when called without any subcommands.
var rootCmd = &cobra.Command{
	Use:     AppName,
	Version: Version,
	Short:   "NuPhy keyboard illumination control app",
	Run: func(cmd *cobra.Command, args []string) {
		lights := openKeyboard()
		name, err := lights.GetName()
		if err != nil {
			log.Printf("Error while reading product name: %v", err)
		}
		fmt.Printf("Keyboard: %v\n", name)
		effects, err := lights.GetEffects()
		if err != nil {
			log.Printf("Error while reading effects: %v", err)
		}
		describeEffects(&effects)
	},
}

func describeEffects(p *keyboard.Effects) {
	state := p.Backlight.CurrentParams()
	fmt.Println("Backlight:")
	fmt.Printf("  Mode: %v (%v)\n", p.Backlight.Mode.Name, p.Backlight.Mode.Code)
	if p.Backlight.Mode.Code != 0 {
		fmt.Printf("  Color: HEX (%v)\n", state.Color)
		fmt.Printf("  Brightness: %v\n", state.Brightness)
		fmt.Printf("  Speed: %v\n", state.Speed)
	}
	fmt.Println("Sidelight:")
	fmt.Printf("  Mode: %v (%v)\n", p.Sidelight.Mode.Name, p.Sidelight.Mode.Code)
	if p.Sidelight.Mode.Code != 0 {
		fmt.Printf("  Color: HEX (%v)\n", p.Sidelight.Params.Color)
		fmt.Printf("  Brightness: %v\n", p.Sidelight.Params.Brightness)
		fmt.Printf("  Speed: %v\n", p.Sidelight.Params.Speed)
	}
	fmt.Println("Halo:")
	fmt.Printf("  Mode: %v (%v)\n", p.Halo.Mode.Name, p.Halo.Mode.Code)
	if p.Halo.Mode.Code != 0 {
		fmt.Printf("  Color: HEX (%v)\n", p.Halo.Params.Color)
		fmt.Printf("  Brightness: %v\n", p.Halo.Params.Brightness)
		fmt.Printf("  Speed: %v\n", p.Halo.Params.Speed)
	}
}

// Execute is the main CLI entrypoint.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	err := hid.Init()
	if err != nil {
		log.Fatalf("Error while initializing HID: %v", err)
	}
}

func openKeyboard() keyboard.Lights {
	backlight, err := keyboard.Open()
	if err != nil {
		if errors.Is(err, hid.ErrNotFound) {
			fmt.Println("Keyboard is not found")
			os.Exit(1)
		} else {
			log.Fatalf("Error while opening backlight: %v", err)
		}
	}
	return backlight
}
