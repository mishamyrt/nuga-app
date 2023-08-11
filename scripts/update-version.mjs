#!/usr/bin/env node
// @ts-check
/*
  Script to update the version in the wails.json file. In the current build system,
  the main version is specified in the Makefile, so it is necessary to update it in other places.
  Usage: ./scripts/update-version.mjs <path> <version>
  * `path` is the path to wails.json
  * `version` is the version that should be included in the final file
*/
import { readFile, writeFile } from 'fs/promises'
import { argv, exit } from 'process'

if (argv.length < 4) {
  console.error("Too few arguments")
  console.log("Usage: update-version.mjs <path> <version>")
  exit(1)
}

async function main () {
  const path = argv[2]
  const version = argv[3]
  const content = await readFile(path, { encoding: "utf-8" })
  const config = JSON.parse(content)

  config.info.productVersion = version
  await writeFile(path, JSON.stringify(config, null, 2))
}

main()
