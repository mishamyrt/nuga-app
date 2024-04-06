#!/bin/sh

pack_arch() {
  cd /opt/nuga || exit 1
  make "AppDir/$1"
  cd /opt/nuga/build/bin/ || exit 1
  appimage-builder
}

if [ -z "$1" ]; then
  pack_arch amd64
else
  pack_arch "$1"
fi

