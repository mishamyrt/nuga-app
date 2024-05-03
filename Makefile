VERSION = 2.3.2
DIST_PATH = dist

OS := `echo $(shell uname) | tr A-Z a-z`
ARCH := $(shell arch)

include makefiles/build.mk
include makefiles/appdir.mk
include makefiles/install.mk
include makefiles/dev.mk
include makefiles/qa.mk
include makefiles/linux-builder.mk
include makefiles/glyphs.mk

.PHONY: configure
configure:
	make setup-qa
	go work sync
	wails doctor

.PHONY: generate
generate:
	./scripts/update-version.mjs wails.json "$(VERSION)"
	wails generate module

.PHONY: clean
clean:
	rm -rf ui/node_modules
	rm -rf ui/dist
	rm -rf "$(BUILD_PATH)"
	rm -rf "$(DIST_PATH)"

.PHONY: publish
publish:
# Add Makefile We add the file because of the $VERSION variable
	git add Makefile
# Update changelog
	node ./scripts/add-release-link.mjs "$(VERSION)"
	git add CHANGELOG.md
	git commit -m "docs: Release $(VERSION) 🔥"
# Create tag
	git tag "v$(VERSION)"
	git push
	git push --tags

$(DIST_PATH):
	mkdir -p $(DIST_PATH)
