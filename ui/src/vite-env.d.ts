/// <reference types="svelte" />
/// <reference types="vite/client" />

declare type HexColor = string

declare type RGBColor = {
  R: number
  G: number
  B: number
}

declare type Maybe<T> = T | null

declare namespace keys {
  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  class MacroAction {}
}
