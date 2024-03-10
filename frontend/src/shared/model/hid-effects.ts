import { createQueue } from 'effector-queue'

const [createHIDEffect, pendingHIDStore] = createQueue({
  minInterval: 200
})

export {
  createHIDEffect,
  pendingHIDStore
}
