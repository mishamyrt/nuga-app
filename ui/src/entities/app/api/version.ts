import { CheckUpdates, GetVersion } from '$wailsjs/go/usecase/EnvironmentUsecase'

export async function getVersion () {
  const version = await GetVersion()
  return version
}

export async function checkUpdates () {
  await CheckUpdates()
}
