import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import db from "./config/db.js";
import router from "./routes/index.js";

config();

const app = express();
const clientURL = "*";

const corsOptions = {
  origin: clientURL,
};

app.use(cors(corsOptions));
app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));
app.use("/api", router);



(async () => {
  await db.authenticate();
  await db.sync({ force: false, alter: true });
})();

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    "Server up and running at http://%s:%s",
    process.env.SERVER_HOST,
    process.env.SERVER_PORT
  );
});
