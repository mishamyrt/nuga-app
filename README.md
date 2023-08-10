# Nuga [![Quality assurance](https://github.com/mishamyrt/Nuga/actions/workflows/quality-assurance.yaml/badge.svg)](https://github.com/mishamyrt/Nuga/actions/workflows/quality-assurance.yaml)

Application for controlling NuPhy® keyboards.

<img src="https://nuga.myrt.co/window.png" width="800px" />

### Features

* Lights control.
* ~~Key mapping control~~ Not ready yet. 

**Supported devices**: Halo75, Halo65, Halo96.

## Packages

* [lib](./lib/) – Golang library.
* [app](./app/) – Graphic interface for managing the state of the keyboard.

## Development

For local development, you need to set up environments. For this purpose you will need:

* [golang](https://go.dev/doc/install) 1.20+
* [Wails](https://wails.io/docs/gettingstarted/installation) 2.5+
* [pnpm](https://pnpm.io/installation) 8+

### Libraries

#### macOS

```sh
brew install libhid
```

### Starting

To run a local application, the target `dev` is used:

```sh
make dev
```

If you want to run another OS interface on macOS, you should run the `dev-simulation` target:

```sh
make dev-simulation
```


## Protocol

The library is based on reverse-engineering of the keyboard protocol. The knowledge that was obtained is recorded in the [`docs`](./docs/) folder.

## Trademarks

NuPhy® is a registered trademark of NuPhy Studio. Nuga is an unofficial product and is not affiliated with NuPhy Studio.
