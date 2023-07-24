package hid

import "strconv"

func formatVersion(v uint16) string {
	symbols := strconv.FormatInt(int64(v), 16)
	version := ""
	for i := range symbols {
		version += string(symbols[i])
		if i != len(symbols)-1 {
			version += "."
		}
	}
	return version
}
