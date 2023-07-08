import { Router } from "express";
import multer from "multer";
import { createRoteiro } from "../controllers/roteiro.js";
import { createTypeRoteiro } from "../controllers/roteiro.js";
import { getRoteiro } from "../controllers/roteiro.js";
import { eliminarRoteiro } from "../controllers/roteiro.js";
import { storage } from "../config/multerconfig.js";
import { getTypeRoteiro } from "../controllers/roteiro.js";
import { updateRoteiro } from "../controllers/roteiro.js";
import { getRoteiroById } from "../controllers/roteiro.js";



const upload = multer({ storage: storage });

const roteiroRoutes = Router();

roteiroRoutes.post("/createRoteiro", upload.single("imagem"), createRoteiro);

roteiroRoutes.post("/createTypeRoteiro", createTypeRoteiro);

roteiroRoutes.get("/getRoteiro", getRoteiro);

roteiroRoutes.get("/getRoteiroById/:id", getRoteiroById);

roteiroRoutes.get("/getRoteiroType", getTypeRoteiro)

roteiroRoutes.delete("/deleteRoteiro", eliminarRoteiro);

roteiroRoutes.put("/updateRoteiro/:id", upload.single("imagem"), updateRoteiro);


export default roteiroRoutes;
