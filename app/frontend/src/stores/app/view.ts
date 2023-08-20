import { atom } from 'nanostores'

/**
 * List of all Views in the application
 */
export type AppView = 'lights' | 'device' | 'keys' | 'application'

export const view = atom<AppView>('lights')
