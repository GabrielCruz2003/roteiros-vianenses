import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";

import connectToDatabase from './config/db.js';

await connectToDatabase.sequelize.sync({ force: false, alter: true });


import { config } from 'dotenv';
config();

// create express app
const app = express();

// client can be postman | react website | react localhost link | etc
const clientURL = "*";

// CORS options
const corsOptions = {
  origin: clientURL,
};
app.use(cors(corsOptions));

// output logs
app.use(morgan("short"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// images folder
app.use("/uploads", express.static("./uploads"));

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", routes);

// correr server no url host:port definido em .env
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    "Server up and running at http://%s:%s",
    process.env.SERVER_HOST,
    process.env.SERVER_PORT
  );
});
