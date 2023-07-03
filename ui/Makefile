VERSION = 1.0.0-beta1

LD_FLAGS = -X 'main.AppVersion=v$(VERSION)' -s -w

.PHONY: build
build:
	make clean
	wails build -trimpath -ldflags "$(LD_FLAGS)"

.PHONY: clean
	rm -rf ./build/bin
