import { Router } from "express";
import multer from "multer";
import { createRoteiro } from "../controllers/roteiro.js";
import { createTypeRoteiro } from "../controllers/roteiro.js";
import { getRoteiro } from "../controllers/roteiro.js";

import { storage } from "../config/multerconfig.js";
import { getTypeRoteiro } from "../controllers/roteiro.js";



const upload = multer({ storage: storage });

const roteiroRoutes = Router();

roteiroRoutes.post("/createRoteiro", upload.single("imagem"), createRoteiro);

roteiroRoutes.post("/createTypeRoteiro", createTypeRoteiro);

roteiroRoutes.get("/getRoteiro", getRoteiro);

roteiroRoutes.get("/getRoteiroType", getTypeRoteiro)


export default roteiroRoutes;
