GOLANGCI_LINT_VERSION = v1.55.2
REVIVE_VERSION = v1.3.4
LEFTHOOK_VERSION = v1.6.8

.PHONY: setup-qa
setup-qa:
	curl -sSfL \
		https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh \
		| sh -s -- -b $(GO_BIN_PATH) $(GOLANGCI_LINT_VERSION)
	go install github.com/mgechev/revive@$(REVIVE_VERSION)
	go install github.com/evilmartians/lefthook@$(LEFTHOOK_VERSION)

.PHONY: hook
hook:
	lefthook install

.PHONY: lint
lint:
	make lint-backend
	make lint-ui

.PHONY: lint-backend
lint-backend:
	golangci-lint run ./...
	revive -config ./revive.toml  ./...

.PHONY: lint-ui
lint-ui:
	cd ui; pnpm lint
	cd ui; tsc

.PHONY: test
test:
	cd ui; pnpm test

.PHONY: format
format:
	cd ui; pnpm format
