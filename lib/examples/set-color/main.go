// Package contains an example of how to use the nuga library
package main

import (
	"fmt"
	"nuga/pkg/color"
	"nuga/pkg/keyboard"
)

func main() {
	targetColor := color.RGB{
		R: 0, G: 255, B: 255,
	}
	k, _ := keyboard.Open()
	c, _ := k.GetColors()
	var input string
	for i := 0; i < len(c); i++ {
		c.Set(i, 0, targetColor)
		k.SetColors(c)
		fmt.Printf("Tested %v", i)
		fmt.Scanln(&input)
	}
}
