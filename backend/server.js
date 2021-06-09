import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import companyRoutes from './routes/companyRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/companies', companyRoutes);

// app.get('/api/companies', (req, res) => {
//   res.json(companies);
// });

// app.get('/api/company/:id', (req, res) => {
//   const company = companies.find((company) => company._id === req.params.id);
//   res.json(company);
// });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
