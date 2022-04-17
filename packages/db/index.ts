import "reflect-metadata"
import { DataSource } from "typeorm"
import { Crossword } from "@crossword/backend/entities/crossword"

export const AppDataSource = new DataSource({
    type: "oracle",
    host: "adb.us-phoenix-1.oraclecloud.com",
    port: 1521,
    username: "admin",
    password: "nhwaOAhsc4a2",
    serviceName: "g9d823141ae4a7a_crossword_medium.adb.oraclecloud.com",
    synchronize: true,
    logging: true,
    entities: [Crossword],
    subscribers: [],
    migrations: []
})