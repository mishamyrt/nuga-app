import { CheckUpdates, GetVersion } from '$wailsjs/go/nuga/App'

export async function getVersion () {
  const version = await GetVersion()
  return version
}

export async function checkUpdates () {
  await CheckUpdates()
}
