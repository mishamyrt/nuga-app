package usecase

import (
	"context"
	"nuga_ui/internal/dto"
	"nuga_ui/internal/interfaces"

	"github.com/mishamyrt/nuga-lib/dump"
	"github.com/mishamyrt/nuga-lib/features/keys/layout"
)

// KeysUsecase represents the keys use case
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

// GetKeys returns the current keys
func (k *KeysUsecase) GetKeys() (*dto.KeyMap, error) {
	mode := k.repo.Settings.GetMode()
	dev := k.repo.Device.Get()
	var keys *layout.KeyMap
	var err error

	if mode == dto.WindowsOSMode {
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

// GetDefaultKeys returns the default keys
func (k *KeysUsecase) GetDefaultKeys() (*dto.KeyMap, error) {
	mode := k.repo.Settings.GetMode()
	dev := k.repo.Device.Get()
	defaultState, err := dump.GetDefaults(dev.Name)
	if err != nil {
		return nil, err
	}
	var codes []uint32
	if mode == dto.WindowsOSMode {
		codes = defaultState.Keys.Win
	} else {
		codes = defaultState.Keys.Mac
	}

	keys, err := dev.Features.Keys.Parse(codes)
	if err != nil {
		return nil, err
	}
	dtoKeys := (*dto.KeyMap)(keys)
	return dtoKeys, nil
}

// SetKeys sets the keys
func (k *KeysUsecase) SetKeys(keys dto.KeyMap) error {
	mode := k.repo.Settings.GetMode()
	dev := k.repo.Device.Get()
	layoutKeys := layout.KeyMap(keys)
	effect, err := dev.Features.Light.GetEffects()
	if err != nil {
		return err
	}
	if mode == dto.WindowsOSMode {
		err = dev.Features.Keys.SetWin(&layoutKeys)
	} else {
		err = dev.Features.Keys.SetMac(&layoutKeys)
	}
	if err != nil {
		return err
	}
	err = dev.Features.Light.SetEffects(effect)
	if err != nil {
		return err
	}
	return nil
}

// GetKeyGroups returns the key groups
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
