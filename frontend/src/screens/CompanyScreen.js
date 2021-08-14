import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';

import { listCompanyDetails } from '../actions/companyActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AssetSummary from '../components/AssetSummary';
import ValutationSummary from '../components/ValutationSummary';
import Meta from '../components/Meta';

const CompanyScreen = ({ match }) => {
  const dispatch = useDispatch();

  const companyDetails = useSelector((state) => state.companyDetails);
  const { loading, error, company } = companyDetails;

  useEffect(() => {
    dispatch(listCompanyDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={company.name} />
          <Row className='mb-3'>
            <Col md={5}>
              <ListGroup variant='flush'>
                <Image
                  src={company.logo}
                  alt={company.name}
                  fluid
                  style={{ maxHeight: '180px' }}
                />
                <Button
                  className='btn btn-dark my-3'
                  href={company.website}
                  target='_blank'
                >
                  Company Website
                </Button>
              </ListGroup>
            </Col>
            <Col md={7}>
              <ValutationSummary company={company} />
            </Col>
          </Row>
          <h2 className='text-center'>Assets</h2>
          <Row>
            {company.assets.map((asset) => (
              <Col key={asset._id} md={4}>
                <AssetSummary asset={asset} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default CompanyScreen;
