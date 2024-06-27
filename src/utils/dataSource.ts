import "reflect-metadata";
import { DataSource } from "typeorm";
import env from "../utils/env";

export const dataSource = new DataSource({
    type: 'postgres',
    url : env.db.url,
    entities: ['{src,public}/entities/**/*.{js,ts}'],
    synchronize: true
  });

  dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });