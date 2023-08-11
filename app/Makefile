OUT_DIR = build/bin
OUT_APPDIR = build/bin/AppDir
TEMPLATE_APPDIR = build/linux/AppDir

define write_manifest
	TARGET_ARCH="$(1)" envsubst < build/linux/AppImageBuilder.yaml > "$(OUT_DIR)/AppImageBuilder.yml"
endef

define copy_binary
	mkdir -p "$(OUT_APPDIR)/usr/local/bin"
	cp "build/bin/Nuga-linux-$(1)" "$(OUT_APPDIR)/usr/local/bin/Nuga"
endef

.PHONY: AppDir/amd64
AppDir/amd64: AppDir
	$(call write_manifest,x86_64)
	$(call copy_binary,x86_64)

.PHONY: AppDir/arm64
AppDir/arm64: AppDir
	$(call write_manifest,aarch64)
	$(call copy_binary,aarch64)

.PHONY: AppDir
AppDir:
	rm -rf "$(OUT_APPDIR)"
	cp -r "$(TEMPLATE_APPDIR)" "$(OUT_APPDIR)"

