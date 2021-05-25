import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Company from '../components/Company';
import companies from '../companies';

const HomeScreen = () => {
  return (
    <>
      <h1>Natural Resource Companies</h1>
      <Row>
        {companies.map((company) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Company company={company} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
