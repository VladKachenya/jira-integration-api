import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./router";
import config from '../config';
import { Database } from '../component/db';


process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const server = http.createServer(router);

const database = new Database();

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
(async () => {

  try {
    let retries = 5;
    while (retries) {
      try {
        await database.connect();
        break;
      } catch (err) {
        console.log(err);
        retries -= 1;
        console.log(`retries left: ${retries}`);
        // wait 5 seconds
        await new Promise(res => setTimeout(res, 5000));
      }
    }
    if (config.isDevelopment) {
      await database.runMigrations();
    }

    server.listen(config.server.port, () =>
      console.log(`Server is running http://localhost:${config.server.port}`)
    );

    process.on('SIGINT', async () => {
      try {
        await database.disconnect();
        process.exit(0);
      } catch (e) {
        process.exit(1);
      }
    });
  } catch (e) { console.log(e); }
})();
