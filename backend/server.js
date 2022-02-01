import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
import bodyParser from 'body-parser';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import currencyRoutes from './routes/currencyRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import s3UploadRoutes from './routes/s3UploadRoutes.js';
import commodityRoutes from './routes/commodityRoutes.js';

dotenv.config();

connectDB();

const app = express();

//Enables requiests with JSON data in the body
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));

app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', s3UploadRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/commodity', commodityRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
