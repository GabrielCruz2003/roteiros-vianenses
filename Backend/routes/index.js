import express from 'express';
import userRoutes from './users.js';
import roteiroRoutes from './roteiro.js';
import comentarioRoutes from './comentario.js';

const router = express.Router();

router.use('/users', userRoutes);

router.use('/roteiro', roteiroRoutes);

router.use('/comentario', comentarioRoutes)

router.use('/', (req, res) => {
    res.send('Hello World!');
});


export default router;
