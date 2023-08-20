#!/usr/bin/env node
// @ts-check
/*
  The script checks the version passed to it to see if it is stable. This is determined by the absence of any suffixes in the passed version.
  For example:
  v1.0.0 - true
  v1.0.0-rc - false
  Usage: is-stable.mjs <version>
*/
import { argv, exit } from 'process'

const STABLE_RE = /v[0-9]+\.[0-9]+\.[0-9]+$/

function main(tag) {
  console.log(
    STABLE_RE.test(tag)
  )
}

if (argv.length < 3) {
  console.error("Too few arguments")
  console.log("Usage: is-stable.mjs <tag>")
  exit(1)
}

main(argv[2])
