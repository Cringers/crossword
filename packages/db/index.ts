import "reflect-metadata"
import { DataSource } from "typeorm"
import { Crossword } from "@crossword/backend/entities/crossword"
import { CONFIG } from "@crossword/config";

export const AppDataSource = new DataSource({
    type: "oracle",
    host: "adb.us-phoenix-1.oraclecloud.com",
    port: 1521,
    username: "admin",
    password: "nhwaOAhsc4a2",
    serviceName: "g9d823141ae4a7a_crossword_medium.adb.oraclecloud.com",
    extra: {
        connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.us-phoenix-1.oraclecloud.com))(connect_data=(service_name=g9d823141ae4a7a_crossword_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)(ssl_server_cert_dn="CN=adwc.uscom-east-1.oraclecloud.com, OU=Oracle BMCS US, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))'
    },
    synchronize: true,
    logging: true,
    entityPrefix: CONFIG.STAGE === "development" ? CONFIG.STAGE + "_" : "",
    entities: [Crossword],
    subscribers: [],
    migrations: []
})