MSG := $(shell echo `date '+%Y-%m-%d %H:%M:%S'`)

default: build

watch: build
		stack exec blog watch & node_modules/.bin/gulp watch

build: build-exec clean build-static
		stack exec blog build

build-static:
	node_modules/.bin/gulp build

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