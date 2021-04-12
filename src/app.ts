import 'reflect-metadata';
import express, { NextFunction } from 'express';
import 'express-async-errors';
import createConnection from './database';

import { router } from './router';
import { AppError } from './errors/appError';

createConnection();
const app = express();
app.use(express.json());
app.use(router);

app.use(function (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    let json:any = {error: error.message}
    if (error.details){
      json.details = error.details;
    }
    return res.status(error.statusCode).json(json);
  }
  return res
    .status(500)
    .json({ error: `Internal server error: ${error.message}` });
});

export { app };
