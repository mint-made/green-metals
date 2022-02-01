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
import { ASSET_LIST_RESET } from '../constants/assetConstants';
import LineChart from '../components/graphs/LineChart';

const CompanyScreen = ({ match }) => {
  const dispatch = useDispatch();

  const companyDetails = useSelector((state) => state.companyDetails);
  const { loading, error, company } = companyDetails;

  const assetList = useSelector((state) => state.assetList);
  const { assetsLoading, assetsError, assets } = assetList;

  useEffect(() => {
    dispatch(listCompanyDetails(match.params.id));
  }, [dispatch, match]);

  useEffect(() => {
    if (!company) {
      return;
    }
    if (!company.assets || !company.assets.length > 0) {
      dispatch({ type: ASSET_LIST_RESET });
    } else {
      const assetRefArray = company.assets.map((asset) => asset.assetRef);
      console.log('ListAssets Request: ', assetRefArray);
      dispatch(listAssets('', '', assetRefArray));
    }
  }, [dispatch, company]);

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
          <Row>
            <Col>
              {company.trading.data && !!company.trading.data.length && (
                <LineChart data={company.trading.data} />
              )}
            </Col>
          </Row>

          {assetsLoading ? (
            <Loader />
          ) : assetsError ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Row className='d-flex justify-content-center'>
              <h2 className='text-center'>Assets</h2>

              {assets.map((asset) => (
                <Col key={asset._id} xs={12} sm={6} md={6} lg={4}>
                  <AssetSummary asset={asset} companyRef={company._id} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default CompanyScreen;
