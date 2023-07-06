import express from 'express';
import { Router } from 'express';
import { createInscricao, getInscricao,getInscricaoByUser } from '../controllers/inscricoes.js';


const inscricoesRouter = Router();

inscricoesRouter.post("/createInscricao", createInscricao)

inscricoesRouter.get("/getInscricao", getInscricao)

inscricoesRouter.get("/getInscricaoByUser/:user_id", getInscricaoByUser)

export default inscricoesRouter;