const express = require('express');

const companies = require('./data/companies');

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

app.listen(5001, console.log('Server running on port 5001'));
