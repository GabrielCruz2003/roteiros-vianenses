import express from 'express';
import userRoutes from './users.js';

const router = express.Router();

router.use('/users', userRoutes);

router.use('/', (req, res) => {
    res.send('Hello World!');
});


export default router;
