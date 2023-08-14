#!/bin/bash
# Environment variables:
# APPLE_TEAM_ID — Team or Developer ID. Used for import validation.
# KEYCHAIN_NAME — Keychain with certificate for given Team ID.
# Usage: sign-mac.sh [...file.app]

TEMP_DIR=$(mktemp -d)

if [ -z "$KEYCHAIN_NAME" ]
then
  KEYCHAIN_FILE_NAME="login.keychain"
else
  KEYCHAIN_FILE_NAME="$KEYCHAIN_NAME.keychain"
fi

function sign_app() {
  file_base_name=$(basename "$1" .app)
  dir_name=$(dirname "$1")
  zip_path="$dir_name/$file_base_name.zip"
  temp_app_path="$TEMP_DIR/Nuga.app"
  codesign \
    --keychain "$KEYCHAIN_FILE_NAME" \
    -s "$APPLE_TEAM_ID" \
    --force \
    --options=runtime \
    --verbose \
    --deep \
    "$1"
  mv "$1/" "$temp_app_path"
  ditto -c -k --keepParent "$temp_app_path" "$zip_path"
  rm -rf "$temp_app_path"
}

echo "$TEMP_DIR"
for file in "$@"
do
  sign_app "$file"
done
rm -rf "$TEMP_DIR"
