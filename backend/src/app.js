import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes/index.js';

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  registerRoutes(app);

  app.use((req, res) => {
    if (!res.headersSent) {
      res.status(404).json({ message: 'Route not found' });
    }
  });

  app.use((error, req, res, next) => {
    const status = error?.status || 500;
    const message = error?.message || 'Unexpected error occurred';
    if (!res.headersSent) {
      res.status(status).json({ message });
    } else {
      next(error);
    }
  });

  return app;
};

export { createApp };
