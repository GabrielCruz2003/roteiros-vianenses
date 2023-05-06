import Router from "express";
import multer from "multer";
import { createRoteiro } from "../controllers/roteiro.js";


const RoteiroRoutes = Router();

RoteiroRoutes.post("/createRoteiro", createRoteiro);


export default RoteiroRoutes;