import express from 'express';
import userRoutes from './users.js';
import RoteiroRoutes from './roteiro.js';

const router = express.Router();

router.use('/users', userRoutes);

router.use('/roteiro', RoteiroRoutes);

router.use('/', (req, res) => {
    res.send('Hello World!');
});


export default router;
