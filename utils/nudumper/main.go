package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"nuga/pkg/light"
	"os"
)

type ProtocolDump struct {
	Colors []int
	Params []int
	Name   string
}

func formatDump(colors []byte, params []byte, name string) (string, error) {
	var dump ProtocolDump
	dump.Name = name
	dump.Colors = make([]int, len(colors))
	dump.Params = make([]int, len(params))
	for i := range colors {
		dump.Colors[i] = int(colors[i])
	}
	for i := range params {
		dump.Params[i] = int(params[i])
	}
	content, err := json.Marshal(dump)
	if err != nil {
		return "", err
	}
	return string(content), nil
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Output path not provided")
		fmt.Println("Usage: nudumper <output_file>")
		os.Exit(1)
	}
	outFile := os.Args[1]
	k, err := light.OpenHardware()
	if err != nil {
		log.Panicf("Couldn't open keyboard: %v", err)
	}
	params, err := k.GetRawEffects()
	if err != nil {
		log.Panicf("Couldn't read params: %v", err)
	}
	name, err := k.Handle.Device.GetProductStr()
	if err != nil {
		log.Panicf("Couldn't read product name: %v", err)
	}
	colors, err := k.GetRawColors()
	if err != nil {
		log.Panicf("Couldn't read colors: %v", err)
	}
	content, err := formatDump(colors, params, name)
	if err != nil {
		log.Panicf("Couldn't format dump: %v", err)
	}
	err = ioutil.WriteFile(outFile, []byte(content), 0655)
	if err != nil {
		log.Panicf("Couldn't write file: %v", err)
	}
}
