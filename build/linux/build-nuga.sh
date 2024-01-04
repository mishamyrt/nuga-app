#!/bin/sh
VERSION=$1
ARCH=$(arch)
LD_FLAGS="-X 'nuga_ui/internal/nuga.AppVersion=v${VERSION}' -s -w"

cd app || exit 1
echo "Building Linux $ARCH app binary"
go build \
  -buildvcs=false \
  -trimpath \
  -tags desktop,wv2runtime.download,production \
  -ldflags "$LD_FLAGS" \
  -o "build/bin/Nuga-linux-$ARCH"
