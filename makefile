MSG := $(shell echo `date '+%Y-%m-%d %H:%M:%S'`)

default: build

watch: build-exec clean
		node_modules/.bin/gulp watch & stack exec blog watch

build: build-exec clean
		node_modules/.bin/gulp build
		stack exec blog build

build-exec:
		stack build

publish: build
		git checkout gh-pages
		cp -r _site/* ./
		git add .
		git commit -m "$(MSG)"
		git push origin gh-pages
		git checkout master

clean:
		stack exec blog clean