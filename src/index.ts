import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from './routes'
import { DataSource, createConnection } from "typeorm";
import env from './utils/env'
// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const dataSource = new DataSource({
  type: 'postgres',
  url : env.db.url,
  entities: ['{src,public}/entities/**/*.{js,ts}'],
  synchronize: true
});
app.use(router);
app.listen(PORT, () => { 
  console.log("⚡: Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});