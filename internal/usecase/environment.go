package usecase

import (
	"context"
	"nuga_ui/config"
	"nuga_ui/internal/interfaces"
	"nuga_ui/pkg/github"
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

// CheckUpdates finds latest release URL and emits it as event
func (e *EnvironmentUsecase) CheckUpdates() {
	go func() {
		repo := github.NewRepo("mishamyrt/Nuga")
		tags, err := repo.Tags()
		if err != nil || len(tags) == 0 {
			return
		}
		latest := tags[0]
		current := e.repo.Environment.GetVersion()
		if current != latest {
			updateURL := repo.FormatTagURL(latest)
			runtime.EventsEmit(e.ctx, "update", updateURL)
		}
	}()
}

// Restart app
func (e *EnvironmentUsecase) Restart() {
	overseer.Restart()
}
