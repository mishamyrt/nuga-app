#!/usr/bin/env node
// @ts-check
import { argv, exit } from 'process'

/**
 * @param {string} stream
 */
function getHexPairs(stream) {
    const pairs = []
    for (let i = 0; i < stream.length; i += 2) {
        pairs.push(stream.substring(i, i + 2))
    }
    return pairs
}

function main() {
    const pairs = getHexPairs(argv[2])
    const result = pairs
        .map(i => `0x${i}`)
        .join(', ')
    console.log(result)
}

if (argv.length < 4) {
    console.error("Too few arguments")
    console.log("Usage: update-version.mjs <path> <version>")
    exit(1)
}

if (argv[2].length % 2 !== 0) {
    console.error("Wrong HEX stream")
    exit(1)
}

main()
