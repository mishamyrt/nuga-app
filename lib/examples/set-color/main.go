// Package contains an example of how to use the nuga library
package main

import (
	"fmt"
	"nuga/pkg/color"
	"nuga/pkg/light"
)

func main() {
	targetColor := color.RGB{
		R: 0, G: 255, B: 255,
	}
	l, _ := light.Open()
	c, _ := l.GetColors()
	var input string
	for i := 0; i < len(c); i++ {
		c.Set(i, 0, targetColor)
		l.SetColors(c)
		fmt.Printf("Tested %v", i)
		fmt.Scanln(&input)
	}
}
