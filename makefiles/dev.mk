# Nuga dev Makefile targets
.PHONY: dev
dev:
	cd app; wails dev -loglevel Debug -v 2
