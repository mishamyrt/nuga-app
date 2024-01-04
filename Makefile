VERSION = 1.0.0-rc
DIST_PATH = dist

OS := `echo $(shell uname) | tr A-Z a-z`
ARCH := $(shell arch)

include makefiles/build.mk
include makefiles/appdir.mk
include makefiles/install.mk
include makefiles/dev.mk
include makefiles/qa.mk
include makefiles/linux-builder.mk

.PHONY: configure
configure:
	make setup-qa
	go work sync
	wails doctor

.PHONY: generate
generate:
	./scripts/update-version.mjs wails.json "$(VERSION)"
	cd app; wails generate module

.PHONY: clean
clean:
	rm -rf frontend/node_modules
	rm -rf frontend/dist
	rm -rf "$(BUILD_PATH)"
	rm -rf "$(DIST_PATH)"

.PHONY: publish
publish:
# Update changelog
	node ./scripts/add-release-link.mjs "$(VERSION)"
	git add CHANGELOG.md
	git commit -m "docs: Release $(VERSION) 🔥"
# Create tag
	git tag "v$(VERSION)"
	git push --tags

$(DIST_PATH):
	mkdir -p $(DIST_PATH)
