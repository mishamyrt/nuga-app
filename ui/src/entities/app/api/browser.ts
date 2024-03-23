import { BrowserOpenURL } from '$wails/runtime'

export function openBrowser (url: string) {
  BrowserOpenURL(url)
}
