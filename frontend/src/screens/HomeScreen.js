import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';

import Company from '../components/Company';
import companies from '../companies';

const HomeScreen = () => {
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
            <Company company={company} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HomeScreen;
