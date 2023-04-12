import express from 'express';
import userRoutes from './users';

const app = express();
const PORT = 5500;

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
