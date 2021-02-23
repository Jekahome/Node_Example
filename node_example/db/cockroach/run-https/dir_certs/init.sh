#!/usr/bin/env bash

mkdir certs my-safe-directory

cockroach cert create-ca --certs-dir=certs --ca-key=my-safe-directory/ca.key

cockroach cert create-node \
localhost \
$(hostname) \
--certs-dir=certs \
--ca-key=my-safe-directory/ca.key


cockroach cert create-client \
root \
--certs-dir=certs \
--ca-key=my-safe-directory/ca.key

# ./stop-cluster.sh
./run-cluster.sh

#  узлы уже были запущены cockroach start и ожидают инициализации в качестве нового кластера
cockroach init --certs-dir=certs --host=localhost:26257

# создание базы данных и пользователя
cockroach --certs-dir=certs sql -e "CREATE USER IF NOT EXISTS max WITH PASSWORD 'roach';CREATE DATABASE storage;SET database = storage;GRANT ALL ON DATABASE storage TO max;GRANT admin TO max;"

# Создайте сертификат для пользователя max.
cockroach cert create-client max --certs-dir=certs --ca-key=my-safe-directory/ca.key


echo "Open browser https://localhost:8080/";

echo "Enter password: roach"
cockroach   --certs-dir=certs --host=localhost:26257 sql -d "storage" -u "max"
# cockroach   --certs-dir=certs --host=localhost:26257 sql  --url "postgresql://jeka@localhost:26257/storage"