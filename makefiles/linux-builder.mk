BUILDER_IMAGE_NAME = nuga-linux-builder

define build_builder
	cd app/build/linux; docker buildx build \
		--file wails.Dockerfile \
		--load \
		--platform "linux/$(1)" \
		-t "$(BUILDER_IMAGE_NAME)-$(1):latest" \
		.
endef

define copy_appimage
	cp "app/build/bin/Nuga-latest-$(1).AppImage" "$(DIST_PATH)/Nuga-$(VERSION)-$(2).AppImage"
endef

define build_binary
	docker rm "nuga-builder-$(1)" || true
	docker run \
		-it \
		--name "nuga-builder-$(1)" \
		--platform "linux/$(1)" \
		--volume ".:/opt/nuga" \
		"$(BUILDER_IMAGE_NAME)-$(1):latest" \
		build-nuga $(VERSION) || docker rm "nuga-builder-$(1)"
	docker rm "nuga-builder-$(1)" || true
endef

.PHONY: linux-builder/setup-appimage
linux-builder/setup-appimage:
	cd app/build/linux; docker buildx build \
		--file appimage.Dockerfile \
		--load \
		--platform "linux/amd64" \
		-t "appimage-builder:latest" .

.PHONY: linux-builder/setup
linux-builder/setup:
	make linux-builder/setup-appimage
	$(call build_builder,arm64)
	$(call build_builder,amd64)

.PHONY: linux-builder/release
linux-builder/release:
	make linux-builder/binary
	make linux-builder/appimage

.PHONY: linux-builder/shell
linux-builder/binary:
	$(call build_binary,arm64)
	$(call build_binary,amd64)

.PHONY: linux-builder/release/arm64
linux-builder/release/arm64:
	make linux-builder/setup-appimage
	$(call build_builder,arm64)
	$(call build_binary,arm64)

.PHONY: linux-builder/appimage
linux-builder/appimage:
	docker rm nuga-appimage-builder || true
	docker run \
		-it \
		--name nuga-appimage-builder \
		--platform "linux/amd64" \
		--volume ".:/opt/nuga" \
		"appimage-builder:latest" \
		pack-appimage || docker rm nuga-appimage-builder
	docker rm nuga-appimage-builder || true
	mkdir -p $(DIST_PATH)
	$(call copy_appimage,aarch64,arm64)
	$(call copy_appimage,x86_64,amd64)


