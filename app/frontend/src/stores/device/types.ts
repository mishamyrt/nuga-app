export type OSMode = 'win' | 'mac'

export interface ConnectionDescription {
  name: string
  path: string
  firmware: string
}

export interface Mode {
  os: OSMode
  individual: boolean
}
