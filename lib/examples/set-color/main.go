package main

import (
	"fmt"
	"nuga/pkg/color"
	"nuga/pkg/keyboard"
)

func main() {
	targetColor := color.New(0, 255, 255)
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
