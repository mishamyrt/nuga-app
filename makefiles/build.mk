# Nuga build Makefile targets
BUILD_PATH = app/build/bin
PLATFORMS_DARWIN = darwin/arm64,darwin/amd64
LD_FLAGS = -X 'nuga_ui/internal/nuga.AppVersion=v$(VERSION)' -s -w

define build_platforms
	cd app; wails build \
		-clean \
		-platform "$(1)" \
		-trimpath \
		-ldflags "$(LD_FLAGS)"
endef

define pack_darwin_release
	mkdir -p "$(DIST_PATH)/$(1)"
	mv "$(BUILD_PATH)/Nuga-$(1).app" "$(DIST_PATH)/$(1)/Nuga.app"
	cd "$(DIST_PATH)/$(1)"; codesign -fs 'Nuga Developer' --deep Nuga.app
	cd "$(DIST_PATH)/$(1)"; zip -9 -y -r -q Nuga.zip Nuga.app
	mv "$(DIST_PATH)/$(1)/Nuga.zip" "$(DIST_PATH)/Nuga-mac-$(VERSION)-$(1).zip"
	rm -rf "$(DIST_PATH)/$(1)"
endef

.PHONY: build/darwin
build/darwin:
	$(call build_platforms,"$(PLATFORMS_DARWIN)")
	mkdir -p "$(DIST_PATH)"
	$(call pack_darwin_release,arm64)
	$(call pack_darwin_release,amd64)

.PHONY: build/linux
build/linux:
	cd app; wails build \
		-clean \
		-o "Nuga-linux-$(ARCH)" \
		-trimpath \
		-ldflags "-X 'nuga_ui/internal/nuga.AppVersion=v$(VERSION)' -s -w"

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
	make linux-builder/binary
	make linux-builder/appimage

.PHONY: build/dumper
build/dumper:
	go build -o dist/k916-dumper utils/k916-dumper/main.go