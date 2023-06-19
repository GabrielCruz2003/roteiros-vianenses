import express from 'express';
import { Router } from 'express';
import { getLikes, addLike } from '../controllers/likes.js';


const likesRoutes = Router();

likesRoutes.post('/addLike', addLike);




export default likesRoutes;