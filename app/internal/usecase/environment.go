package usecase

import (
	"context"
	"nuga_ui/config"
	"nuga_ui/internal/interfaces"
	"nuga_ui/pkg/integrations/github"
	go_runtime "runtime"

	"github.com/jpillora/overseer"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// EnvironmentUsecase represents environment-related use case
type EnvironmentUsecase struct {
	ctx  context.Context
	repo *interfaces.Repository
}

// OnStartup is a life-cycle hook that runs when app starts
func (e *EnvironmentUsecase) OnStartup(ctx context.Context, repo *interfaces.Repository) error {
	e.ctx = ctx
	e.repo = repo
	e.checkUpdates()
	return nil
}

// OnShutdown is a life-cycle hook that runs when app finishes
func (e *EnvironmentUsecase) OnShutdown() error {
	return nil
}

// GetVersion returns application version
func (e *EnvironmentUsecase) GetVersion() string {
	return config.AppVersion
}

// GetOS returns current client OS name
func (e *EnvironmentUsecase) GetOS() string {
	os := go_runtime.GOOS
	if os == "darwin" {
		return "mac"
	}
	return os
}

// Restart app
func (e *EnvironmentUsecase) Restart() {
	overseer.Restart()
}

func (e *EnvironmentUsecase) checkUpdates() {
	version := e.repo.Environment.GetVersion()
	go func() {
		updater := github.NewRepo("mishamyrt/Nuga")
		tags, err := updater.Tags()
		if err != nil {
			return
		}
		latest := tags[0]
		if version != latest {
			runtime.EventsEmit(e.ctx, "update", updater.ReleaseURL(latest))
		}
	}()
}
