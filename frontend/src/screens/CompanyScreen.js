import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import companies from '../companies';
import MCap from '../components/MCap';

const CompanyScreen = ({ match }) => {
  const company = companies.find((company) => company._id === match.params.id);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={company.logo} alt={company.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{company.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              {company.tickers[0].exchange}:{company.tickers[0].currency}
              {company.tickers[0].price}
            </ListGroup.Item>
            <Button
              className='btn btn-dark my-3'
              href={company.website}
              target='_blank'
            >
              Company Website
            </Button>
            <ListGroup.Item>
              Primary Commodity: {company.primaryCommodity}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Share Price</Col>
                  <Col>
                    {company.tickers[0].currency}
                    {company.tickers[0].price}
                  </Col>
                </Row>
                <Row>
                  <Col>MCap</Col>
                  <Col>
                    <MCap mcap={company.mcap} />
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CompanyScreen;
