import { createSequence } from '$shared/lib'

const [createHIDEffect, pendingHIDStore] = createSequence({
  minInterval: 200
})

export {
  createHIDEffect,
  pendingHIDStore
}
