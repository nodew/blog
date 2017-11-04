MSG := $(shell echo `date '+%Y-%m-%d %H:%M:%S'`)

watch: build-exec clean
		stack exec blog watch

build: build-exec clean
		stack exec blog build

build-exec:
		stack build

publish: build
		git checkout gh-pages
		cp -r _site/* ./
		git add .
		git commit -m "$(MSG)"
		git push origin gh-pages

clean:
		stack exec blog clean