import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import db from "./config/db.js";
import router from "./routes/index.js";

config();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(morgan("combined"));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(
      "Server up and running at http://%s:%s",
      process.env.SERVER_HOST,
      process.env.SERVER_PORT
    );
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Erro interno no servidor" });
});

export default app;
