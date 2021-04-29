import { downloadsRouter } from './routes/download';
import { json } from 'body-parser';
import { projectRouter } from './routes/project';
import { twitchRouter } from './routes/twitch';
import cors from 'cors';
import errorRoutes from './middleware/route-error';
import express from 'express';

const app = express();

app.use(json());
app.use(cors());
app.use(projectRouter);
app.use(twitchRouter);
app.use(downloadsRouter);
app.use(errorRoutes);

export default app;
