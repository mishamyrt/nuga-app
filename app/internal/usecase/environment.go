package usecase

import (
	"context"
	"nuga_ui/config"
	"nuga_ui/internal/interfaces"
	"nuga_ui/pkg/integrations/github"
	go_runtime "runtime"

	"github.com/jpillora/overseer"
)

// EnvironmentUsecase represents environment-related use case
type EnvironmentUsecase struct {
	ctx context.Context
}

// OnStartup is a life-cycle hook that runs when app starts
func (e *EnvironmentUsecase) OnStartup(ctx context.Context, _ *interfaces.Repository) error {
	e.ctx = ctx
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
	go func() {
		updater := github.NewRepo("mishamyrt/Nuga")
		latest, err := updater.Tags()
		println(latest, err)
		// if err != nil || len(latest) == 0 {
		// 	return
		// }
		// if AppVersion != latest {
		// 	runtime.EventsEmit(a.ctx, "update", updater.ReleaseURL(latest))
		// }
	}()
}
