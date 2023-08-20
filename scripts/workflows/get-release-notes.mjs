#!/usr/bin/env node
/*
  The script cuts the release description by version from CHANGELOG.md in "Keep a Changelog" format.
  More information: https://keepachangelog.com/en/1.0.0/
  Usage: get-release-notes.mjs <tag>
*/
import { argv, exit } from 'process'
import { readChangelog } from '../utils/changelog.mjs'

const releaseTitleRe = /## ?\[.*\]/m

/**
 * Extracts release notes from CHANGELOG.md
 * @param {string} version
 */
function extractReleaseNotes(changelog, version) {
  const versionTitleRe = `## ?\\[${version.replaceAll('.', '\\.')}\\]`
  const lines = changelog.split('\n')
  let start = 0
  let end = 0
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].match(versionTitleRe)) {
      start = i+1
    } else if (lines[i].match(releaseTitleRe)){
      end = i
      break
    }
  }
  if (!start || !end) {
    console.error('Release offsets not found')
    console.log({ start, end })
    exit(1)
  }
  const notes = lines.slice(start, end)
  return notes
    .join('\n')
    .trim()
}

async function main(version) {
  const changelog = await readChangelog()
  console.log(extractReleaseNotes(changelog, version))
}

if (argv.length < 3) {
  console.error("Too few arguments")
  console.log("Usage: get-release-notes.mjs <tag>")
  exit(1)
}

main(argv[2].substring(1))
