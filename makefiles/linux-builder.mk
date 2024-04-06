BUILDER_IMAGE = mishamyrt/nuga-linux-builder
APPIMAGE_BUILDER_IMAGE = mishamyrt/nuga-appimage-builder

# Wails builder functions

define build_builder
	cd build/linux; docker buildx build \
		--file wails.Dockerfile \
		--load \
		--platform "linux/$(1)" \
		-t "$(BUILDER_IMAGE):latest-$(1)" \
		.
endef

define push_builder
	docker push "$(BUILDER_IMAGE):latest-$(1)"
endef

# Binary functions

define build_binary
	docker run \
		--rm \
		--platform "linux/$(1)" \
		--volume ".:/opt/nuga" \
		"$(BUILDER_IMAGE):latest-$(1)" \
		build-nuga $(VERSION)
endef

define copy_appimage
	cp "build/bin/Nuga-latest-$(1).AppImage" "$(DIST_PATH)/Nuga-$(VERSION)-$(2).AppImage"
endef

# AppImage builder

.PHONY: linux-builder/image-appimage
linux-builder/image-appimage:
	cd build/linux; docker buildx build \
		--file appimage.Dockerfile \
		--load \
		--platform "linux/amd64" \
		-t "$(APPIMAGE_BUILDER_IMAGE):latest" .

.PHONY: linux-builder/image-appimage
linux-builder/push-image-appimage:
	docker push "$(APPIMAGE_BUILDER_IMAGE):latest"

# ARM64 image actions

.PHONY: linux-builder/image-arm64
linux-builder/image-arm64:
	$(call build_builder,arm64)

.PHONY: linux-builder/push-image-arm64
linux-builder/push-image-arm64:
	$(call push_builder,arm64)

# AMD64 image actions

.PHONY: linux-builder/image-amd64
linux-builder/image-amd64:
	$(call build_builder,amd64)

.PHONY: linux-builder/push-image-amd64
linux-builder/push-image-amd64:
	$(call push_builder,amd64)

# Binary actions

.PHONY: linux-builder/binary-arm64
linux-builder/binary-arm64: $(DIST_PATH)
	$(call build_binary,arm64)
	mv build/bin/Nuga-linux-aarch64 dist/Nuga-linux-arm64

.PHONY: linux-builder/binary-amd64
linux-builder/binary-amd64:
	$(call build_binary,amd64)
	mv build/bin/Nuga-linux-x86_64 dist/Nuga-linux-amd64

.PHONY: linux-builder/binary
linux-builder/binary:
	make linux-builder/binary-arm64
	make linux-builder/binary-amd64

# AppImage packing

.PHONY: linux-builder/appimage
linux-builder/appimage: $(DIST_PATH)
	docker run \
		--rm \
		--platform "linux/amd64" \
		--volume ".:/opt/nuga" \
		"$(APPIMAGE_BUILDER_IMAGE):latest" \
		pack-appimage
	$(call copy_appimage,x86_64,amd64)


