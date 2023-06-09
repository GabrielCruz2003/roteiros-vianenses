import { Router } from "express";
import { createComentario } from "../controllers/comentarios.js";
import { getComentarios } from "../controllers/comentarios.js";
import { deleteComentario } from "../controllers/comentarios.js";


const comentarioRoutes = Router();

comentarioRoutes.post("/createComentario", createComentario);

comentarioRoutes.get("/comentarios/:id", getComentarios);

comentarioRoutes.delete("/deleteComentario", deleteComentario);


export default comentarioRoutes;