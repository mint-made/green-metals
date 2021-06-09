const express = require('express');
const dotenv = require('dotenv');

const companies = require('./data/companies');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/companies', (req, res) => {
  res.json(companies);
});

app.get('/api/company/:id', (req, res) => {
  const company = companies.find((company) => company._id === req.params.id);
  res.json(company);
});

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
