package usecase

import (
	"context"
	"log"
	"nuga_ui/internal/dto"
	"nuga_ui/internal/interfaces"
	"slices"
	"sort"
	"strconv"

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

// GetMacros returns the list of macros
func (k *KeysUsecase) GetMacros() (dto.Macros, error) {
	dev := k.repo.Device.Get()
	macros, err := dev.Features.Keys.GetMacros()
	if err != nil {
		return nil, err
	}

	titled := make([]dto.MacroWithTitle, 0, len(macros))
	stored := k.repo.Settings.GetMacros()

	for i, macro := range macros {
		var title string
		for _, storedMacro := range stored {
			isSame, err := dto.IsSameMacro(macro, storedMacro.Macro)
			if err != nil {
				log.Printf("Error comparing macros: %v", err)
				continue
			}
			if isSame {
				title = storedMacro.Title
				break
			}
		}
		if title == "" {
			title = "Macro " + strconv.Itoa(i+1)
		}
		titled = append(titled, dto.MacroWithTitle{
			Macro: macro,
			Title: title,
		})
	}

	return titled, nil
}

// SetMacros sets the list of macros
func (k *KeysUsecase) SetMacros(macros dto.Macros) error {
	dev := k.repo.Device.Get()
	effect, err := dev.Features.Light.GetEffects()
	if err != nil {
		return err
	}
	err = dev.Features.Keys.SetMacros(macros.ToDomain())
	if err != nil {
		return err
	}
	err = k.repo.Settings.SetMacros(macros)
	if err != nil {
		return err
	}
	return dev.Features.Light.SetEffects(effect)
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

var groupsOrder = []string{
	"Backlight",
	"System",
	"Multimedia",
	"Modifiers",
	"Special",
	"Navigation",
	"Letters",
	"Numbers",
	"Function",
	"Symbols",
	"NumPad",
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
		k.sortGroup(group, keys)
		groups = append(groups, dto.KeyGroup{
			Title: group,
			Keys:  keys,
		})
	}
	sort.Slice(groups, func(i, j int) bool {
		firstIndex := slices.Index(groupsOrder, groups[i].Title)
		secondIndex := slices.Index(groupsOrder, groups[j].Title)
		return firstIndex < secondIndex
	})
	return groups
}

func (k *KeysUsecase) sortGroup(group string, keys []dto.Key) {
	if group == "Function" {
		sort.Slice(keys, func(i, j int) bool {
			first, firstErr := strconv.Atoi(keys[i].Title[1:])
			second, secondErr := strconv.Atoi(keys[j].Title[1:])
			if firstErr != nil || secondErr != nil {
				return false
			}
			return first < second
		})
	} else {
		sort.Slice(keys, func(i, j int) bool {
			return keys[i].Title < keys[j].Title
		})
	}
}
