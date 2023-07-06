import express from 'express';
import { Router } from 'express';
import { getLikes, addLike, getLikesByUser } from '../controllers/likes.js';


const likesRoutes = Router();

likesRoutes.post('/addLike', addLike);

likesRoutes.get('/getLikes/:user_id/:roteiro_id', getLikes);

likesRoutes.get('/getLikesByUser/:user_id', getLikesByUser);





export default likesRoutes;