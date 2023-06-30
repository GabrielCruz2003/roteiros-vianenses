import express from 'express';
import { Router } from 'express';
import { createInscricao, getInscricao } from '../controllers/inscricoes.js';


const inscricoesRouter = Router();

inscricoesRouter.post("/createInscricao", createInscricao)

inscricoesRouter.get("/getInscricao", getInscricao)

export default inscricoesRouter;