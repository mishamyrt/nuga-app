#!/bin/sh
VERSION=$1
ARCH=$(arch)
LD_FLAGS="-X 'nuga_ui/internal/nuga.AppVersion=v${VERSION}' -s -w"

cd app || exit 1
echo "Building Linux $ARCH app binary"
wails build \
  -s \
  -o "Nuga-linux-$ARCH" \
  -trimpath \
  -ldflags "$LD_FLAGS"
