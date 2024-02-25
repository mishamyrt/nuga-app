import { createSequence } from '$shared/lib'

const [createHIDEffect] = createSequence({
  minInterval: 200
})

export {
  createHIDEffect
}
