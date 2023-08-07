# Nuga [![Quality assurance](https://github.com/mishamyrt/Nuga/actions/workflows/quality-assurance.yaml/badge.svg)](https://github.com/mishamyrt/Nuga/actions/workflows/quality-assurance.yaml)

This mono repository contains packages for managing NuPhy® keyboards.

### Features

* Lights control.
* ~~Key mapping control~~ Not ready yet. 

**Supported devices**: Halo75, Halo65, Halo96.

## Packages

* [lib](./lib/) – Golang library.
* [app](./app/) – Graphic interface for managing the state of the keyboard.

## Protocol

The library is based on reverse-engineering of the keyboard protocol. The knowledge that was obtained is recorded in the [`docs`](./docs/) folder.

## Trademarks

NuPhy® is a registered trademark of NuPhy Studio. Nuga is an unofficial product and is not affiliated with NuPhy Studio.
