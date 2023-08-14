#!/bin/bash
# Environment variables:
# KEYCHAIN_PROFILE — Name of the profile saved via `store-credentials`.
# Usage: notarize-mac.sh [...file.zip]

WORKING_DIR="$PWD"

function process_app() {
  temp_dir=$(mktemp -d)
  xcrun notarytool submit "$1" \
    --keychain-profile "$KEYCHAIN_PROFILE" \
    --wait
  mv "$1" "$temp_dir/Nuga.zip"
  cd "$temp_dir" || exit 1
  unzip Nuga.zip
  xcrun stapler staple Nuga.app
  cd "$WORKING_DIR" || exit 1
  ditto -c -k --keepParent "$temp_dir/Nuga.app" "$1"
  rm -rf "$temp_dir"
}

for file in "$@"
do
  process_app "$file" &
done
wait
