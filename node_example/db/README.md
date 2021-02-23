

### ORM [TypeORM] с синтаксисом TypeScript и поддержкой CockroachDB

```
npm i async -S
npm i typescript -D
npm i typeorm -S
npm i reflect-metadata -S
npm i @types/node -D
npm i @types/express -S
npm i pg -D
```

Соединение ssl без ormconfig.json:
```
import "reflect-metadata";
import {createConnections,DatabaseType} from "typeorm";

export default createConnections([{
    name: process.env.DB_CONNECTION_NAME,
    type: <DatabaseType>process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: <number><unknown>process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.DIR_BASE + "/db/cockroach/run-https/dir_certs/certs/ca.crt").toString(),
        key: fs.readFileSync(process.env.DIR_BASE +  "/db/cockroach/run-https/dir_certs/certs/client.max.key").toString(),
        cert: fs.readFileSync(process.env.DIR_BASE +  "/db/cockroach/run-https/dir_certs/certs/client.max.crt").toString(),
    },
    entities:  [
        // config.dir.base + "/db/orm/entities/*.js"
        Users
    ],
    synchronize: true,
    logging: false,
    poolErrorHandler:function(err){
        console.error("poolErrorHandler: ",err);
    }
}])
```
createConnection() Если параметр параметров подключения не указан, параметры подключения считываются из ormconfig.json 
файлов или переменных среды/

Подключение entities через путь к папке использует require и не работает при использовании import/export (type:module) 
Поэтому использую createConnection() с параметрами.

Файл ormconfig.json:
```json
{
  "type": "cockroachdb",
  "host": "localhost",
  "port": 26000,
  "username": "max",
  "password": "roach",
  "database": "storage",
  "synchronize": true,
  "logging": false,
  "ssl": {
    "rejectUnauthorized": false,
    "ca": "-----BEGIN CERTIFICATE-----\nMIIDBzCCAe+gAwIBAgIRALNKYhqvQKbV2rvDUt/0dl8wDQYJKoZIhvcNAQELBQAw\nKzESMBAGA1UEChMJQ29ja3JvYWNoMRUwEwYDVQQDEwxDb2Nrcm9hY2ggQ0EwHhcN\nMjEwMjEzMTkyNzQzWhcNMzEwMjIyMTkyNzQzWjArMRIwEAYDVQQKEwlDb2Nrcm9h\nY2gxFTATBgNVBAMTDENvY2tyb2FjaCBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEP\nADCCAQoCggEBALFhL8BzSZLO41FAtiowSXR5YvTWxzgeakDgPXJTD6Dhq4cArxqF\nzz1WhJU3KhXwMUpbyQnY7GLqDLg8O4HETegQUNfFvwa5ZaOm2slrz+fRZnUyQW1/\nvce5T7ZX7YYUPAVLZuXiL+O6WqzPk1MV/MsswiuzBny3TRx/3ulyiDtEmtdn4O03\nIlSswxnPFZs/DCK4nFb45JQDoe4H59HuXOBm4P7QQnFOSfv5t8gFfgIbh4hYxtK5\nsAucQaeDVT9uKBg/iT++Z5r15e4KAZidw/U4Y5JI9m6sEPrNs99q9GlS7YfYnG5b\nhp5Zf1cj6DJXdc+LCp/YjRacd2sWDuCSf7cCAwEAAaMmMCQwDgYDVR0PAQH/BAQD\nAgLkMBIGA1UdEwEB/wQIMAYBAf8CAQEwDQYJKoZIhvcNAQELBQADggEBAGeOX4fK\nFOxpDUgx7gCZ920DiYm/hinmrNnFYBR6fR/c029EHQQJ+ov/OW0DCLN+9UNP5N5N\nIU5P1aZR4WTGKZPHJrXsNkABTuIpH/dPs2E9URyCzX8bwktOBJvvcHmlv2fYqJH/\nqKJNWCNTlCQjemVuRUZPLRF7RcjKH6PK3mbwMi1gt6qttlJ8weOOHugjy8ULBVRp\nbCEKfNX3OihusPkSG8Pdpi30XebyM8O3tOUbztO+6LOEentSQTuy+gJYCV8mFezV\nkoSYfYd5P6qvgpdm2MyhCWhUW2InKDGxpHt9TWwyRsYy/nGUHc3LF7w1psj4wAJk\nz73wX605pUdados=\n-----END CERTIFICATE-----",
    "key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAvnOu+43bn94Mncg5BGSPHiBi41FQAhx+mGhYgcAE/lb4jiKN\nWmqcljt/ygCOewAc2pXW349JZvmH98WtFVsbCawB8SxzBnMOVVU0Crm9d9h3o00g\nQDd3JsNiJqHONp/k3ZdUOEU/hO2Xvk/n8TDBhtzFd0mF9Yt3UA5gniyJNuBkY3US\newvEJWCPNbkHAsmrfAhiRxOGCr3CdzLD4c6Ur4jOBgxsrr44FDl/HrcoO432sffe\n2KcueJkhaxIA6H/Tq4r4EZyR/6UMSrEwIyxi1Sn+LG8DLsMFvrr4BeaQNdi0x5rA\nUR2ItD4MTPLgjhMgXabpecinGOq/Ug/MZA2gpwIDAQABAoIBAQCl0glnoqK3ddkc\nQ6lJJtjpTR9sdm6n9/FNd4SgK/TtEgJFltXmBG8j6tgfpA5qD7YPp2i3q4UocFiv\nJWDG+FT5PddPCfl4gxLWv2GZeRD7WPEJsOxEnUZT7Mf3hOgL7XmSaeD9QWXFsixt\nmhsDiAToDC6t5skI+o4+mNYMwhASQxhe6fXCtPYpjPaheoIR7Ze4SeaQPBjVya3z\n+Ib2LF3zyEBzqPINMZ5o1ZHL+nwxIkTMKGZd+C3N9gMZrTN0ZT7McONvttfTp5Xn\nBG7YyRx7PyntlbpH/Yqt5JGT3hlCfpGjMnpWPdpsYuKbiWol+BKAK+OaDe0uIAFZ\nSWZepkORAoGBAMRjao6hXUcQZ5kOESHEdim1a1V6Sl4b2XbXibBL4DZIQPP92QR4\nDJXe8Qkc+D7G6sRJoe6H2KZ/pLh1te48cVfib/z2bx6f36+TipIWPb7znqMuNJVc\nmh7CqMwI8usaIbcGnxdeza9V5csCN3lP0iX8eb7Pth5P1JYIdIO6i+/ZAoGBAPhC\n99XD1qNifi9neqgIfr1enF+K4bW7UEIIg9t/aYsFMWjXAoUQsybdgZaaTQqKTOV0\nVypoot7IwgOA94k4AMbRZvarvg8q4zio6NAfXyCMWmqtwuAS0/LjwgdXS962GRdB\neCR2rt5erOQ6Y0zdohWrYC2oNCQeauYWqOtszER/AoGAdOyn5ZGHQqcutv6cDpm0\nrHJ6HCM6Ibu9BrefH5qdPFRab6pEShfbjmN06LMZze6KmiEoyyaQQ9kdTkGu9s9/\nwA5uFJL4Z6hR+mwChaW+T3EmkwsQfZjrncLR0uDFGFqvlhPYJoboOSsQLIT+WDjA\n6qLeLU/nozZuYIFaNY+cf0kCgYA6MWhqoSc00SeG8RidPrCGryC0fJd/w9KCSACw\neONChQsZ6hxbGJkF6TIxHSYl7FkuB+FOvYw/8IsZyyc68PetovQhqgw4/fKZG27H\nKjNgK8Yd73EYmRE5hA29LsdIAyNKgjwpP/Cpi0O3k8AnCmSt86fty9m9BaxFFtat\nqKkQ/QKBgFb8SWE1vjQfhqOMO9+dhFJMgbCdHvnZoSVNzPVdhO7vpgQsrJhJLYmw\n98rz39yeHLFc9epOmXO+PLD9TIbKRqBK6D8caokk8Nvnx5LDT6QvxLRJfjqbF0kB\neQgKjIJ9pTkYwaZTPm+kurpa0MBr70CXkhOrmB6yTSEL2izCgb7p\n-----END RSA PRIVATE KEY-----",
    "cert": "-----BEGIN CERTIFICATE-----\nMIIC/jCCAeagAwIBAgIQASKCl7FMdr8CdbXxlTM53DANBgkqhkiG9w0BAQsFADAr\nMRIwEAYDVQQKEwlDb2Nrcm9hY2gxFTATBgNVBAMTDENvY2tyb2FjaCBDQTAeFw0y\nMTAyMTMxOTI3NDdaFw0yNjAyMTgxOTI3NDdaMCIxEjAQBgNVBAoTCUNvY2tyb2Fj\naDEMMAoGA1UEAxMDbWF4MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\nvnOu+43bn94Mncg5BGSPHiBi41FQAhx+mGhYgcAE/lb4jiKNWmqcljt/ygCOewAc\n2pXW349JZvmH98WtFVsbCawB8SxzBnMOVVU0Crm9d9h3o00gQDd3JsNiJqHONp/k\n3ZdUOEU/hO2Xvk/n8TDBhtzFd0mF9Yt3UA5gniyJNuBkY3USewvEJWCPNbkHAsmr\nfAhiRxOGCr3CdzLD4c6Ur4jOBgxsrr44FDl/HrcoO432sffe2KcueJkhaxIA6H/T\nq4r4EZyR/6UMSrEwIyxi1Sn+LG8DLsMFvrr4BeaQNdi0x5rAUR2ItD4MTPLgjhMg\nXabpecinGOq/Ug/MZA2gpwIDAQABoycwJTAOBgNVHQ8BAf8EBAMCBaAwEwYDVR0l\nBAwwCgYIKwYBBQUHAwIwDQYJKoZIhvcNAQELBQADggEBAJBbfZXJMW2uOE41mCQf\nRyXtePorLIqbhRizO4XzEFBq/3w5Z3aDxhVxc/0DrV2Xs2Zr6J/sgbMmEVajKwGo\nLgdk7CnrPINAo67HcrB3kQIhFyNe2gbIIbfVB56E6RgDhYo10VJmIH1CRQng3QSd\nYqsXVob/AyN36YBxNpTS+7/8PhF25rnTY2t4b/FA19ZtktZX0L/5u9tIVZln29Hs\n4cTcuSJkrJ23xoqz9F3Tl858odQUCPYe189d0XF3O0JKEMFZDkcyJGYDhGKsCOIO\n20pJSKlRGWxS89rAO9NulyPKGqeau7P25F4F6fqUbbqY1NowTSF9/s1dBGJDpgXg\nj+Q=\n-----END CERTIFICATE-----"
  },
  "entities": [
    "orm/entities/*.js"
  ],
  "migrations": [
    "orm/migration/**/*.js"
  ],
  "subscribers": [
    "orm/subscriber/**/*.js"
  ],
  "cli": {
    "entitiesDir": "orm/entities",
    "migrationsDir": "orm/migration",
    "subscribersDir": "orm/subscriber"
  }
}
```
 

[TypeORM Data Mapper](https://typeorm.io/#/active-record-data-mapper/what-is-the-data-mapper-pattern)


------------------------------------------------------------------------------------------------------------------------
[TypeORM]:(https://typeorm.io)
[cockroach start]:(https://www.cockroachlabs.com/docs/v20.2/cockroach-start)