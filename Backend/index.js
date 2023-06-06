import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import db from "./config/db.js";
import router from "./routes/index.js";
import roteiroModel from "./models/roteiro.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";
import { storage } from "./config/multerconfig.js";

config();

const app = express();
const clientURL = "*";

const corsOptions = {
  origin: clientURL,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para exibir logs das solicitações
app.use(morgan("combined"));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do diretório de uploads
app.use('/uploads', express.static(join(__dirname, './uploads')));

app.use(router);

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Erro interno no servidor' });
});
