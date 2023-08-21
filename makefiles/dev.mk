# Nuga dev Makefile targets
.PHONY: dev
dev:
	cd app; wails dev -loglevel Debug -v 2

.PHONY: dev-memtest
dev-memtest:
	cd app; wails dev -tags memtest -loglevel Debug -v 2

.PHONY: memtest-view
memtest-view:
	go tool pprof \
        -http=:8081 \
        -alloc_space \
        http://localhost:8080/debug/pprof/heap
