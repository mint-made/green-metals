import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Table,
} from 'react-bootstrap';

import { listAssetDetails } from '../actions/assetActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const AssetScreen = ({ match }) => {
  const dispatch = useDispatch();

  const assetDetails = useSelector((state) => state.assetDetails);
  const { loading, error, asset } = assetDetails;

  useEffect(() => {
    dispatch(listAssetDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={`${asset.name} - ${asset.location.country}`} />
          <Row>
            <Col>
              <ListGroup variant='flush'>
                <Image
                  src='frontend/public/images/sample.jpeg'
                  fluid
                  style={{ maxHeight: '180px' }}
                />
                <Button
                  className='btn btn-dark my-3'
                  href='https://www.google.com'
                  target='_blank'
                >
                  Asset Website
                </Button>
              </ListGroup>
            </Col>

            <Col>
              <Card className='rounded'>
                <h3 className='text-center p-3'>{asset.name}</h3>
                <Table className='mb-0' size='sm'>
                  <tbody>
                    <tr>
                      <td>Location</td>
                      <td>
                        {asset.location.country}, {asset.location.province}
                      </td>
                    </tr>
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
                        <Badge variant='primary'>
                          <ConvMcap company={company} />
                        </Badge>
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
          </Row>
        </>
      )}
    </>
  );
};

export default AssetScreen;
