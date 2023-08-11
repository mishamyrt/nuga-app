#!/bin/sh

pack_arch() {
  cd /opt/nuga/app || exit 1
  make "AppDir/$1"
  cd /opt/nuga/app/build/bin/ || exit 1
  appimage-builder
}

pack_arch amd64
pack_arch arm64
