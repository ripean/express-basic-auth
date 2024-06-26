import "reflect-metadata";
import express from "express";
import env from "./util/env";
import router from "./routes";
import { createConnection } from "typeorm";

const app = express();
app.use(express.json())
createConnection({
    type: 'postgres',
    host: env.db.host,
    port: env.db.port,
    username: env.db.user,
    password: env.db.pswd,
    database: env.db.schm,
    entities: ['{src,dist}/entities/**/*.{js,ts}'],
    synchronize: true
  });


app.use(router);
app.listen(env.app.port, () => {
    console.log(`Server running on port ${env.app.port}`);
})