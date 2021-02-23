#!/usr/bin/env bash

# https://www.cockroachlabs.com/docs/stable/remove-nodes.html
sudo pkill haproxy

cockroach quit --certs-dir=certs --host=localhost:26257
cockroach quit --certs-dir=certs --host=localhost:26258
cockroach quit --certs-dir=certs --host=localhost:26259

lsof -n -i4TCP:26257 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
lsof -n -i4TCP:26258 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
lsof -n -i4TCP:26259 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
lsof -n -i4TCP:26260 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
lsof -n -i4TCP:26261 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9

cockroach quit --certs-dir=certs --host=localhost:26260
cockroach quit --certs-dir=certs --host=localhost:26261

