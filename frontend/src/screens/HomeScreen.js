import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

import Company from '../components/Company';

const HomeScreen = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await axios.get('/api/companies');

      setCompanies(res.data);
    };

    fetchCompanies();
  }, []);

  return (
    <>
      <h1>Natural Resource Companies</h1>
      <Table size='sm' striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Mcap</th>
            <th>Primary Commodity</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <Company key={company._id} company={company} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HomeScreen;
