# Nuga install Makefile targets
.PHONY: install/darwin/arm64
install/darwin/arm64:
	rm -rf /Applications/Nuga.app
	cd dist; unzip Nuga-*-arm64.zip
	mv dist/Nuga.app /Applications/Nuga.app

.PHONY: install/darwin/amd64
install/darwin/amd64:
	rm -rf /Applications/Nuga.app
	cd dist; unzip Nuga-*-amd64.zip
	mv dist/Nuga.app /Applications/Nuga.app

.PHONY: install
install:
	make install/$(OS)/$(ARCH)
