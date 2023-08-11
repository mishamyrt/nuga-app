VERSION = 1.0.0-rc
DIST_PATH = dist

OS := `echo $(shell uname) | tr A-Z a-z`
ARCH := $(shell arch)

include makefiles/build.mk
include makefiles/install.mk
include makefiles/dev.mk
include makefiles/qa.mk
include makefiles/linux-builder.mk

.PHONY: configure
configure:
	go work sync
	wails doctor

.PHONY: generate
generate:
	./scripts/update-version.mjs app/wails.json "$(VERSION)"
	cd app; wails generate module

.PHONY: clean
clean:
	rm -rf app/frontend/node_modules
	rm -rf app/frontend/dist
	rm -rf "$(BUILD_PATH)"
	rm -rf "$(DIST_PATH)"
