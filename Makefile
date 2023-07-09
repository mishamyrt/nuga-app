VERSION = 1.0.0-beta1
DIST_PATH = dist
BUILD_PATH = app/build/bin

PLATFORMS = darwin/arm64,darwin/amd64
LD_FLAGS = -X 'main.AppVersion=v$(VERSION)' -s -w

define go_lint
	golangci-lint run ./$(1)/...
	revive -config ./revive.toml  ./$(1)/...
endef

define pack_release
	mkdir -p "$(DIST_PATH)/$(1)"
	mv "$(BUILD_PATH)/Nuga-$(1).app" "$(DIST_PATH)/$(1)/Nuga.app"
	cd "$(DIST_PATH)/$(1)"; zip -9 -y -r -q Nuga.zip Nuga.app
	mv "$(DIST_PATH)/$(1)/Nuga.zip" "$(DIST_PATH)/Nuga-$(1).zip"
	rm -rf "$(DIST_PATH)/$(1)"
endef

sync:
	go work sync

.PHONY: lint
lint:
	make lint-lib
	make lint-app

.PHONY: lint-lib
lint-lib:
	$(call go_lint,lib)

.PHONY: lint-app
lint-app:
	$(call go_lint,app)
	cd app/frontend; pnpm run lint

.PHONY: build
build:
	cd app; wails build \
		-clean \
		-platform "$(PLATFORMS)" \
		-trimpath \
		-ldflags "$(LD_FLAGS)"

.PHONY: release
release:
	make build
	rm -rf "$(DIST_PATH)"
	mkdir -p "$(DIST_PATH)"
	$(call pack_release,arm64)
	$(call pack_release,amd64)

.PHONY: dev
dev:
	cd app; wails dev -loglevel Debug -v 2
