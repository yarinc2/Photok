import express from 'express';
import cors from 'cors';
import { FRONTEND_URL } from './config/consts';
import photosRouter from './routes/photos';
import likesRouter from './routes/likes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(logger);

app.use('/api/photos', photosRouter);
app.use('/api/photos', likesRouter);

app.use(errorHandler);

export default app;
