#!/usr/bin/env bash

# sudo pkill haproxy

#lsof -n -i4TCP:8080 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
#lsof -n -i4TCP:8081 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
#lsof -n -i4TCP:8082 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
#lsof -n -i4TCP:8083 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
#lsof -n -i4TCP:8084 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9

lsof -n -i4TCP:26257 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
lsof -n -i4TCP:26258 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
lsof -n -i4TCP:26259 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
lsof -n -i4TCP:26260 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
lsof -n -i4TCP:26261 | grep LISTEN | tr -s ' ' | cut -f 2 -d ' ' | xargs kill -9
