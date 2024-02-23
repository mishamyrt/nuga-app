# Nuga build Makefile targets
BUILD_PATH = build/bin
PLATFORMS_DARWIN = darwin/amd64,darwin/arm64
LD_FLAGS = -X 'nuga_ui/config.AppVersion=v$(VERSION)' -s -w

define pack_darwin_release
	mkdir -p "$(DIST_PATH)/$(1)"
	mv "$(BUILD_PATH)/Nuga-$(1).app" "$(DIST_PATH)/$(1)/Nuga.app"
	cd "$(DIST_PATH)/$(1)"; zip -9 -y -r -q Nuga.zip Nuga.app
	mv "$(DIST_PATH)/$(1)/Nuga.zip" "$(DIST_PATH)/Nuga-mac-$(VERSION)-$(1).zip"
	rm -rf "$(DIST_PATH)/$(1)"
endef

.PHONY: build/darwin
build/darwin: $(DIST_PATH)
	wails build \
		-clean \
		-trimpath \
		-platform "$(PLATFORMS_DARWIN)" \
		-ldflags "$(LD_FLAGS)"
	cp -r $(BUILD_PATH)/*.app dist/

.PHONY: build/linux
build/linux: $(DIST_PATH)
	wails build \
		-clean \
		-o "Nuga-linux-amd64" \
		-platform "linux/amd64" \
		-trimpath \
		-ldflags "$(LD_FLAGS)"
	cp $(BUILD_PATH)/Nuga-linux-* dist/

.PHONY: build/linux-in-docker
build/linux-in-docker:
	make linux-builder/binary
	make linux-builder/appimage

.PHONY: build
build:
	make build/$(OS)

.PHONY: build/release
build/release:
	mkdir -p "$(DIST_PATH)"
	make build/darwin
	make build/linux-in-docker

.PHONY: release/darwin
release/darwin:
	mv "$(DIST_PATH)/Nuga-arm64.zip" "$(DIST_PATH)/Nuga-$(VERSION)-mac-arm64.zip"
	mv "$(DIST_PATH)/Nuga-amd64.zip" "$(DIST_PATH)/Nuga-$(VERSION)-mac-amd64.zip"
