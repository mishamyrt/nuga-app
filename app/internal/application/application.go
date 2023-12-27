// Package application contains app heart
package application

import (
	"context"
	"embed"
	"log"
	"nuga_ui/internal/interfaces"

	"github.com/wailsapp/wails/v2"
)

// Application represents main app
type Application struct {
	isRunning bool
	assets    embed.FS
	icon      []byte
	repo      *interfaces.Repository
	usecase   *interfaces.Usecase
}

// OnStartup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *Application) OnStartup(ctx context.Context) {
	for _, u := range a.usecase.Slice() {
		err := u.OnStartup(ctx, a.repo)
		if err != nil {
			log.Panicf("Error while starting usecase: %v", err)
		}
	}
}

// OnShutdown is called when the app closes
func (a *Application) OnShutdown(_ context.Context) {
	for _, u := range a.usecase.Slice() {
		err := u.OnShutdown()
		if err != nil {
			log.Panicf("Error while shuting down application: %v", err)
		}
	}
}

// Start application in background
func (a *Application) Start() {
	if a.isRunning {
		return
	}
	a.startSync()
}

func (a *Application) startSync() {
	err := a.repo.Settings.Read()
	if err != nil {
		log.Panicf("Error on reading config: %v", err)
	}
	a.isRunning = true
	err = wails.Run(a.GetOptions())
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	a.isRunning = false
}

// New returns application instance
func New(
	assets embed.FS,
	icon []byte,
	repo *interfaces.Repository,
	usecase *interfaces.Usecase,
) *Application {
	return &Application{
		assets:    assets,
		icon:      icon,
		isRunning: false,
		repo:      repo,
		usecase:   usecase,
	}
}
