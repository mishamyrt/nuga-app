import { attach } from 'effector'

import { type LightDomainStateValue, setStateFx, stateStore } from '$entities/lights'

export const powerStateChanged = attach({
  effect: setStateFx,
  source: stateStore,
  mapParams: (req: LightDomainStateValue<'enabled'>, state) => {
    return {
      ...state,
      [req.domain]: {
        ...state[req.domain],
        enabled: req.enabled
      }
    }
  }
})
