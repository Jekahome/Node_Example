import "reflect-metadata";
import { createConnections } from "typeorm";
import { Users } from "~db/orm/entities/users";
// @ts-ignore
import fs from "fs";
import * as dotenv from "dotenv";
const result = dotenv.config( /*{ path: "../../.env" }*/);
if (result.error) {
    throw result.error;
}
// @ts-ignore
export default createConnections([{
        name: process.env.DB_CONNECTION_NAME,
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            rejectUnauthorized: false,
            ca: fs.readFileSync(process.env.DIR_BASE + "/db/cockroach/run-https/dir_certs/certs/ca.crt").toString(),
            key: fs.readFileSync(process.env.DIR_BASE + "/db/cockroach/run-https/dir_certs/certs/client.max.key").toString(),
            cert: fs.readFileSync(process.env.DIR_BASE + "/db/cockroach/run-https/dir_certs/certs/client.max.crt").toString(),
        },
        entities: [
            // config.dir.base + "/db/orm/entities/*.js"
            Users
        ],
        synchronize: true,
        logging: false,
        poolErrorHandler: function (err) {
            console.error("poolErrorHandler: ", err);
        }
    }]);
