import { LoadPreset, SavePreset } from '$wailsjs/go/usecase/LightsUsecase'

export async function savePreset () {
  await SavePreset()
}

export async function loadPreset () {
  await LoadPreset()
}
