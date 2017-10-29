MSG := $(shell echo `date '+%Y-%m-%d %H:%M:%S'`)

watch: build-exec clean
		stack exec blog watch

build: build-exec clean
		stack exec blog build

build-exec:
		stack build

publish: build
		cp -r _site/* docs
		git add .
		git commit -m "$(MSG)"
		git push origin master

clean:
		stack exec blog clean