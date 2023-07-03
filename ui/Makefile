VERSION = 1.0.0-beta1
BIN_PATH = build/bin
ARM64_PATH = $(BIN_PATH)/arm64
AMD64_PATH = $(BIN_PATH)/amd64

PLATFORMS = darwin/arm64,darwin/amd64
LD_FLAGS = -X 'main.AppVersion=v$(VERSION)' -s -w

.PHONY: build
build:
	make clean
	wails build -platform "$(PLATFORMS)" -trimpath -ldflags "$(LD_FLAGS)"

.PHONY: release
release:
	make build
	mkdir -p \
		"$(ARM64_PATH)" \
		"$(AMD64_PATH)"
	mv "$(BIN_PATH)/Nuga-arm64.app" "$(ARM64_PATH)/Nuga.app"
	mv "$(BIN_PATH)/Nuga-amd64.app" "$(AMD64_PATH)/Nuga.app"
	cd "$(ARM64_PATH)"; zip -9 -y -r -q Nuga.zip Nuga.app
	cd "$(AMD64_PATH)"; zip -9 -y -r -q Nuga.zip Nuga.app
	mv "$(ARM64_PATH)/Nuga.zip" "$(BIN_PATH)/Nuga-arm64.zip"
	mv "$(AMD64_PATH)/Nuga.zip" "$(BIN_PATH)/Nuga-amd64.zip"


.PHONY: clean
clean:
	rm -rf "./$(BIN_PATH)"

.PHONY: dev
dev:
	wails dev -loglevel Debug -v 2
