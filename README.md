# Nuga [![Quality assurance](https://github.com/mishamyrt/Nuga/actions/workflows/quality-assurance.yaml/badge.svg)](https://github.com/mishamyrt/Nuga/actions/workflows/quality-assurance.yaml)

Application for controlling NuPhy® keyboards.

<img src="https://nuga.myrt.co/window.png" width="800px" />

### Features

* Lights control.
* ~~Key mapping control~~ Not ready yet. 

**Supported devices**: Halo75, Halo65, Halo96.

## Installation

### macOS

1. Download the zip archive labeled `mac` from the [latest release](https://github.com/mishamyrt/Nuga/releases/latest).
2. Unzip the archive, copy `Nuga.app` to Applications.
3. Launch `Nuga.app`.
4. The application requests permission to Input Monitoring. This is required to work with the USB HID device. Grant permission.
5. Restart the app

## Development

For local development, you need to set up environments. For this purpose you will need:

* [golang](https://go.dev/doc/install) 1.20+
* [Wails](https://wails.io/docs/gettingstarted/installation) 2.5+
* [pnpm](https://pnpm.io/installation) 8+

### Libraries

#### macOS

```sh
brew install hidapi
```

### Starting

To run a local application, the target `dev` is used:

```sh
make dev
```

If you want to run another OS interface on macOS, you should run the `dev-universal` target:

```sh
make dev-universal
```

### Build

Cross-compiling the application is not possible at this time. Therefore, full build is only possible on macOS. A native build for macOS can be built on macs with Intel® and Apple Silicon™ processors , Linux version is built on either macOS (via Docker) or the amd64 version of Linux.

For native builds, there are targets in the Makefile:

* `build/darwin` – To build macOS app (arm64, amd64)
* `build/linux` – To build Linux app binary (arm64, amd64)

The `build` command is a common alias for these commands and performs a build on the OS that is currently in use.

```sh
make build
```

The result of the build will be archives with the application in the `dist` or `app/build/bin` folder.

### Release

The release is automated through GitHub Actions. To publish a new release, just run a version tag. Automatic build, signing and notarization will be started. Once the build is complete, the files will be attached to the new GitHub Release.

The release description is compiled automatically from the [CHANGELOG.md](./CHANGELOG.md) file.

### Linux cross-compilation

The Linux version can be built on macOS using Docker. To build an image with the toolkit, run the command:

```sh
make linux-builder/setup
```

To build a Linux AppImage using the resulting image, run the command:

```sh
make linux-builder/release
```

## Trademarks

NuPhy® is a registered trademark of NuPhy Studio. Nuga is an unofficial product and is not affiliated with NuPhy Studio.
