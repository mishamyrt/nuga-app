define go_lint
	golangci-lint run ./$(1)/...
	revive -config ./revive.toml  ./$(1)/...
endef

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
