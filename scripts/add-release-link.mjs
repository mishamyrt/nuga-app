#!/usr/bin/env node
// @ts-check
/*
  Script for writing a new version to changelog.
  Usage: add-release-link.mjs 1.0.0
*/

import { argv, exit } from 'process'
import { readChangelog, writeChangelog } from './utils/changelog.mjs'


const RELEASE_URL = 'https://github.com/mishamyrt/Nuga/releases/tag'

/**
 * Script entrypoint
 * @param {string} version - Release version
 */
async function main(version) {
  let changeLog = await readChangelog()
  const heading = `## ${version}`
  if (!changeLog.includes(heading)) {
    console.error('Changelog format problem:')
    console.log(`Heading "${heading}" is missing`)
  }
  const headerLink = `## [${version}]`
  changeLog = changeLog.replace(heading, headerLink)
  changeLog += `[${version}]: ${RELEASE_URL}/v${version}\n`
  await writeChangelog(changeLog)
}

if (argv.length < 3) {
  console.error("Too few arguments")
  console.log("Usage: add-release-link.mjs <input_stream>")
  exit(1)
}

main(argv[2])
