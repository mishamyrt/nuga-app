import { readFile, writeFile } from 'fs/promises'

const CHANGELOG_PATH = 'CHANGELOG.md'


/**
 * Read changelog file
 * @returns {Promise<string>}
 */
export async function readChangelog() {
  const content = await readFile(CHANGELOG_PATH, { encoding: 'utf-8' })
  return `${content.trim()}\n`
}

/**
 * Write changelog file
 * @returns {Promise<void>}
 */
export async function writeChangelog(content) {
  await writeFile(CHANGELOG_PATH, content)
}
