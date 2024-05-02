import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import tasksRouter from './routes/routes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ethereum', tasksRouter);

const PORT: number = 3000;
app.listen(PORT, () => {
    console.log(`Server Running At PORT ${PORT}`);
});
