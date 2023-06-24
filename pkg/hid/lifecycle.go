package hid

import "github.com/sstallion/go-hid"

// Init initializes the keychron package.
// This function MUST be called before starting with devices.
func Init() error {
	err := hid.Init()
	if err != nil {
		return err
	}
	hid.SetOpenExclusive(false)
	return nil
}

// Exit finalizes the keychron package.
// This function should be called after all device handles have been closed to avoid memory leaks.
func Exit() error {
	return hid.Exit()
}
