#!/usr/bin/env node
// @ts-check
/*
  Script for converting Hex Stream from WireShark to a format suitable for Golang arrays
  Usage: ./scripts/format-hex-stream.mjs <input_stream>
  `input_stream` format is hex pairs without spaces. Like: fffff000...
  Output be like: 0xFF, 0xFF, 0xF0, 0x00...
*/

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

if (argv.length < 3) {
    console.error("Too few arguments")
    console.log("Usage: format-hex-stream.mjs <input_stream>")
    exit(1)
}

if (argv[2].length % 2 !== 0) {
    console.error("Wrong HEX stream")
    exit(1)
}

main()
