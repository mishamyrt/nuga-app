import type { Macro, MacroChangedParams } from '../model/types'

export function paramsToMacro (params: MacroChangedParams): Macro {
  return {
    title: params.title,
    repeats: params.repeats,
    actions: params.actions
  }
}
