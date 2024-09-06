import { DataSource, DataSourceOptions } from "typeorm";
import { dbEntities } from "./entities";
import * as dotenv from "dotenv";
import migrations from "./migrations";

if (!process.env["NODE_ENV"] || process.env["NODE_ENV"].toLowerCase() === "development") {
    dotenv.config();
}

export const databaseConfig: DataSourceOptions = {
    // @ts-expect-error expect error since the program doesn't know if the variable DB_TYPE coming from .env will be one of Datasource type strings
    type: process.env["DB_TYPE"],
    host: process.env["DB_HOST"],
    port: Number(process.env["DB_PORT"]),
    username: process.env["DB_USER"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_SCHEMA"],
    entities: dbEntities,
    migrations: migrations
}

export default new DataSource(databaseConfig);