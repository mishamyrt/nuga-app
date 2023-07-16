//go:build memtest

package main

import (
	"log"
	"net/http"
	_ "net/http/pprof"

	"github.com/pkg/profile"
)

func init() {
	profile.Start(profile.MemProfile)
	go func() {
		err := http.ListenAndServe(":8080", nil)
		if err != nil {
			log.Fatalf("Could not start server: %v", err)
		}
	}()
}
