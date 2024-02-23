package usecase

import (
	"context"
	"nuga_ui/internal/dto"
	"nuga_ui/internal/interfaces"

	"github.com/mishamyrt/nuga-lib/keys/layout"
)

type KeysUsecase struct {
	ctx  context.Context
	repo *interfaces.Repository
}

// OnStartup is a life-cycle hook that runs when app starts
func (k *KeysUsecase) OnStartup(ctx context.Context, repo *interfaces.Repository) error {
	k.repo = repo
	k.ctx = ctx
	return nil
}

// OnShutdown is a life-cycle hook that runs when app finishes
func (k *KeysUsecase) OnShutdown() error {
	return nil
}

func (k *KeysUsecase) GetKeys() (*dto.KeyMap, error) {
	config := k.repo.Settings.GetMode()
	dev := k.repo.Device.Get()
	var keys *layout.KeyMap
	var err error

	if config.OSMode == dto.WindowsOSMode {
		keys, err = dev.Features.Keys.GetWin()
	} else {
		keys, err = dev.Features.Keys.GetMac()
	}
	if err != nil {
		return nil, err
	}
	dtoKeys := (*dto.KeyMap)(keys)
	return dtoKeys, nil
}

func (k *KeysUsecase) SetKeys(keys dto.KeyMap) error {
	config := k.repo.Settings.GetMode()
	dev := k.repo.Device.Get()
	layoutKeys := layout.KeyMap(keys)
	if config.OSMode == dto.WindowsOSMode {
		return dev.Features.Keys.SetWin(&layoutKeys)
	}
	return dev.Features.Keys.SetMac(&layoutKeys)
}

func (k *KeysUsecase) GetKeyGroups() []dto.KeyGroup {
	keys := make(map[string][]dto.Key)
	for code, key := range layout.Keys {
		if keys[key.Group] == nil {
			keys[key.Group] = make([]dto.Key, 0)
		}
		keys[key.Group] = append(keys[key.Group], dto.Key{
			Title: key.Title,
			Value: string(code),
		})
	}
	groups := make([]dto.KeyGroup, 0)
	for group, keys := range keys {
		groups = append(groups, dto.KeyGroup{
			Title: group,
			Keys:  keys,
		})
	}
	return groups
}
