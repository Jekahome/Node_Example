###########
# Aliases #
###########

test: test.e2e test.unit

####################
# Testing commands #
####################

REPORTER = list


# Run E2E tests of project.
#
# Usage:
#	make test.e2e

name=$2

test.e2e:
	clear
	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	test/e2e/*.js
	echo Ending test


test.unit:
	clear
	echo Starting test *********************************************************
	 mocha \
	--reporter $(REPORTER) \
	test/unit
	echo Ending test

.PHONY: test
