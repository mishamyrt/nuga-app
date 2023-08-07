VERSION = 1.0.0-beta7
DIST_PATH = dist
BUILD_PATH = app/build/bin

PLATFORMS = darwin/arm64,darwin/amd64
LD_FLAGS = -X 'nuga_ui/internal/nuga.AppVersion=v$(VERSION)' -s -w
UNAME := $(shell uname)
ARCH := $(shell arch)

define go_lint
	golangci-lint run ./$(1)/...
	revive -config ./revive.toml  ./$(1)/...
endef

define pack_release
	mkdir -p "$(DIST_PATH)/$(1)"
	mv "$(BUILD_PATH)/Nuga-$(1).app" "$(DIST_PATH)/$(1)/Nuga.app"
	cd "$(DIST_PATH)/$(1)"; codesign -fs 'Nuga Developer' --deep Nuga.app
	cd "$(DIST_PATH)/$(1)"; zip -9 -y -r -q Nuga.zip Nuga.app
	mv "$(DIST_PATH)/$(1)/Nuga.zip" "$(DIST_PATH)/Nuga-$(VERSION)-$(1).zip"
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

.PHONY: generate
generate:
	./utils/update-version.mjs app/wails.json "$(VERSION)"
	cd app; wails generate module

.PHONY: build
build:
	make generate
	cd app; wails build \
		-clean \
		-platform "$(PLATFORMS)" \
		-trimpath \
		-ldflags "$(LD_FLAGS)"

.PHONY: build-dumper
build-dumper:
	go build -o dist/k916-dumper utils/k916-dumper/main.go

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

.PHONY: dev-memtest
dev-memtest:
	cd app; wails dev -tags memtest -loglevel Debug -v 2

.PHONY: memtest-view
memtest-view:
	go tool pprof \
        -http=:8081 \
        -alloc_space \
        http://localhost:8080/debug/pprof/heap

.PHONY: install_Darwin_arm64
install_Darwin_arm64:
	rm -rf /Applications/Nuga.app
	cd dist; unzip Nuga-*-arm64.zip
	mv dist/Nuga.app /Applications/Nuga.app

.PHONY: install_Darwin_amd64
install_Darwin_amd64:
	rm -rf /Applications/Nuga.app
	cd dist; unzip Nuga-*-amd64.zip
	mv dist/Nuga.app /Applications/Nuga.app

.PHONY: install
install:
	make install_$(UNAME)_$(ARCH)
