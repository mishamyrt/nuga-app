import { BrowserOpenURL } from '$wailsjs/runtime'

export function openBrowser (url: string) {
  BrowserOpenURL(url)
}
