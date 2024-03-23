import { CheckUpdates, GetVersion } from '$wails/go/usecase/EnvironmentUsecase'

export async function getVersion () {
  const version = await GetVersion()
  return version
}

export async function checkUpdates () {
  await CheckUpdates()
}
