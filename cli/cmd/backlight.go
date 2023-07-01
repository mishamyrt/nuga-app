package cmd

import (
	"errors"
	"fmt"
	"nuga/pkg/color"
	"nuga/pkg/keyboard/effect"

	"github.com/spf13/cobra"
)

var effectColor string
var speed int
var brightness int
var mode int

var backlightCmd = &cobra.Command{
	Use:   "backlight",
	Short: "NuPhy keyboard illumination control app",
	Args: func(cmd *cobra.Command, args []string) error {
		if len(effectColor) == 0 && speed == -1 && brightness == -1 && mode == -1 {
			return errors.New("parameters is not specified")
		}
		return nil
	},
	RunE: func(cmd *cobra.Command, args []string) error {
		lights := openKeyboard()
		p, err := lights.GetEffects()
		if err != nil {
			fmt.Printf("Error while reading effect: %v", err)
		}
		if mode > -1 {
			p.Backlight.Mode = effect.Backlight.Find(uint8(mode))
			if p.Backlight.Mode == nil {
				return errors.New("selected mode is not supported")
			}
		}
		if len(effectColor) > 0 {
			if effectColor == "random" {
				p.Backlight.SetColor(7)
			} else {
				colors, err := lights.GetColors()
				if err != nil {
					return err
				}
				rgb, err := color.ParseHex(effectColor)
				if err != nil {
					return err
				}
				colors.SetMacBacklight(p.Backlight.Mode.Code, 5, rgb)
				err = p.Backlight.SetColor(5)
				if err != nil {
					return err
				}
				lights.SetColors(colors)
			}
		}
		if speed > -1 {
			err := p.Backlight.SetSpeed(uint8(speed))
			if err != nil {
				return err
			}
		}
		if brightness > -1 {
			err := p.Backlight.SetBrightness(uint8(brightness))
			if err != nil {
				return err
			}
		}
		return lights.SetEffects(p)
	},
}

var backlightModesCmd = &cobra.Command{
	Use: "modes",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Available backlight modes:")
		for i := 0; i < len(effect.Backlight); i++ {
			fmt.Printf("- %v (%v)\n", effect.Backlight[i].Name, effect.Backlight[i].Code)
		}
	},
}

func init() {
	backlightCmd.PersistentFlags().StringVarP(&effectColor, "color", "c", "", "")
	backlightCmd.PersistentFlags().IntVarP(&speed, "speed", "s", -1, "")
	backlightCmd.PersistentFlags().IntVarP(&brightness, "brightness", "b", -1, "")
	backlightCmd.PersistentFlags().IntVarP(&mode, "mode", "m", -1, "")
	rootCmd.AddCommand(backlightCmd)
	backlightCmd.AddCommand(backlightModesCmd)
}
