import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Table,
} from 'react-bootstrap';

import { listCompanyDetails } from '../actions/companyActions';
import NumFormat from '../components/NumFormat';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CompanyScreen = ({ match }) => {
  const dispatch = useDispatch();

  const companyDetails = useSelector((state) => state.companyDetails);
  const { loading, error, company } = companyDetails;

  useEffect(() => {
    dispatch(listCompanyDetails(match.params.id));
  }, [dispatch, match]);

  console.log(`loading: ${loading} & error: ${error}`, company);
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{company.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {company.trading.exchange}:{company.trading.ticker}
              </ListGroup.Item>

              <Button
                className='btn btn-dark my-3'
                href={company.website}
                target='_blank'
              >
                Company Website
              </Button>
              <Image src={company.logo} alt={company.name} fluid />
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <Table size='sm'>
                <tbody>
                  <tr>
                    <td>Share Price</td>
                    <td>
                      {company.trading.currency}
                      {company.trading.price}
                    </td>
                  </tr>
                  <tr>
                    <td>Market Cap</td>
                    <td>
                      {company.trading.currency}
                      <NumFormat number={company.trading.mcap} dp='2' />
                    </td>
                  </tr>
                  <tr>
                    <td>Shares Issued</td>
                    <td>
                      <NumFormat number={company.issuedShares} dp='2' />
                    </td>
                  </tr>
                  <tr>
                    <td>Primary Commodity</td>
                    <td>{company.primaryCommodity}</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      )}
    </>
  );
};

export default CompanyScreen;
