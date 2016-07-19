SRC = src/*.js

REQUIRED = --require should

COMPILER = --compilers js:babel-core/register

TESTS = test/app/* \
	test/plugin/* \
	test/errors/*

test:
	@NODE_ENV=test node_modules/.bin/babel-node \
		./node_modules/.bin/_mocha \
		$(COMPILER) \
		$(REQUIRED) \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test node_modules/.bin/babel-node \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- -u exports \
		$(COMPILER) \
		$(REQUIRED) \
		$(TESTS) \
		--bail

.PHONY: test
