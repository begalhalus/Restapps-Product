require("dotenv/config");
import "reflect-metadata";
import { createConnections } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import { Com_user } from "./entity/Com_user";
import { Product } from "./entity/Product";

(async () => {
  await createConnections([
    {
      name: "default",
      type: "postgres",
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: 5432,
      synchronize: true,
      logging: false,
      entities: [Com_user, Product],
      migrations: ["src/migration/**/*.{js,ts}"],
      subscribers: ["src/subscriber/**/*.{js,ts}"],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
      },
    },
  ]);

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );

  app.use("/", routes);

  app.listen(process.env.APP_PORT, () => {
    console.log("Server started on port " + process.env.APP_PORT);
  });
})();
