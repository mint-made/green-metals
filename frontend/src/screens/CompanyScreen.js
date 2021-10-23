import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';

import { listCompanyDetails } from '../actions/companyActions';
import { listAssets } from '../actions/assetActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AssetSummary from '../components/AssetSummary';
import ValutationSummary from '../components/ValutationSummary';
import Meta from '../components/Meta';

const CompanyScreen = ({ match }) => {
  const dispatch = useDispatch();

  const companyDetails = useSelector((state) => state.companyDetails);
  const { loading, error, company } = companyDetails;

  const assetList = useSelector((state) => state.assetList);
  const { assetsLoading, assetsError, assets } = assetList;

  useEffect(() => {
    dispatch(listCompanyDetails(match.params.id));

    if (company.assets[0]) {
      const assetRefArray = company.assets.map((asset) => asset.assetRef);
      dispatch(listAssets('', '', assetRefArray));
    }
  }, [dispatch, match]);
  console.log(assets);

  return (
    <>
      {loading || assetsLoading ? (
        <Loader />
      ) : error || assetsError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta
            title={`${company.trading.exchange}:${company.trading.ticker}`}
          />
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
          <Row className='d-flex justify-content-center'>
            {company.assets.map((asset) => (
              <Col key={asset._id} md={4}>
                <h2>{asset.name}</h2>
                <AssetSummary
                  assetRef={asset.assetRef}
                  companyRef={company._id}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default CompanyScreen;
