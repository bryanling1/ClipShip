import express from 'express';
import { projectRouter } from './routes/project';
import { json } from 'body-parser'
import cors from 'cors';
import errorRoutes from './middleware/route-error';

const app = express()

app.use(json());
app.use(cors());
app.use(projectRouter);
app.use(errorRoutes);


export default app;