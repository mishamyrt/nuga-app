#!/usr/bin/env node
// @ts-check
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
