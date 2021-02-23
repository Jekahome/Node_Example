#!/usr/bin/env bash

cockroach  --certs-dir=certs --host=localhost:26257 sql -d "storage" -u "max"
# cockroach  --certs-dir=certs --host=localhost:26257 sql  --url "postgresql://max@localhost:26257/storage"