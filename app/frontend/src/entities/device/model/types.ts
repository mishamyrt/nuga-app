export enum OSMode {
  Windows = 'win',
  MacOS = 'mac'
}

export interface Mode {
  os: OSMode
  individual: boolean
}

export interface ModeSettings {
  osMode: OSMode
  individual: boolean
}
