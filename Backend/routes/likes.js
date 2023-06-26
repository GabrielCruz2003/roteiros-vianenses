import express from 'express';
import { Router } from 'express';
import { getLikes, addLike } from '../controllers/likes.js';


const likesRoutes = Router();

likesRoutes.post('/addLike', addLike);

likesRoutes.get('/getLikes/:user_id/:roteiro_id', getLikes);





export default likesRoutes;