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
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { listAssetDetails } from '../actions/assetActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const AssetScreen = ({ match }) => {
  const dispatch = useDispatch();

  const assetDetails = useSelector((state) => state.assetDetails);
  const { loading, error, asset } = assetDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
                <Image src={asset.image} fluid />
                <Button
                  className='btn btn-dark my-3'
                  href={asset.link}
                  target='_blank'
                >
                  Asset Website
                </Button>
              </ListGroup>
            </Col>

            <Col>
              <Card className='rounded'>
                <div className='d-flex justify-content-center'>
                  <h3 className='text-center p-3'>{asset.name}</h3>
                  <div className='p-3'>
                    {userInfo && userInfo.isAdmin && (
                      <>
                        <LinkContainer to={`/admin/asset/${asset._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                      </>
                    )}
                  </div>
                </div>
                <Table className='mb-0' size='sm'>
                  <tbody>
                    <tr>
                      <td>Location</td>
                      <td>
                        {asset.location.country}
                        {asset.location.province
                          ? `, ${asset.location.province}`
                          : ''}
                      </td>
                    </tr>
                    <tr>
                      <td>Stage</td>
                      <td>{asset.stage}</td>
                    </tr>
                    <tr>
                      <td>Resource</td>
                      <td>
                        {asset.resource.map((r, index) => (
                          <ListGroup.Item
                            key={index}
                            className='d-flex justify-content-between'
                          >
                            <p className='m-0'>
                              {r.i && r.mi
                                ? `${r.i}${r.units} Inf. ${r.mi}${r.units} M+I ${r.type}`
                                : r.i
                                ? `${r.i}${r.units} Inf. ${r.type}`
                                : r.mi
                                ? `${r.mi}${r.units} M+I ${r.type}`
                                : ''}
                            </p>
                          </ListGroup.Item>
                        ))}
                      </td>
                    </tr>
                    {asset.study ? (
                      <tr>
                        <td>Study</td>
                        <td>{asset.study}</td>
                      </tr>
                    ) : (
                      <></>
                    )}

                    {asset.npv && asset.npv.value ? (
                      <tr>
                        <td>
                          NPV<sub>{asset.npv.discount}</sub>
                        </td>
                        <td>{asset.npv && `$${asset.npv.value}m`}</td>
                      </tr>
                    ) : !asset.npv ? (
                      <tr>
                        <td>
                          NPV<sub>8</sub>
                        </td>
                        <td className='p-0'>
                          <OverlayTrigger
                            placement='bottom'
                            overlay={
                              <Tooltip id='Hi'>
                                <strong>Subscribe</strong> to view content.
                              </Tooltip>
                            }
                          >
                            <Link to='/subscribe' target='blank'>
                              <div className='p-3-5 d-flex justify-content-left align-items-center'>
                                <p
                                  className='m-0 text-dark'
                                  style={{ filter: 'blur(3px)' }}
                                >
                                  $1000m
                                </p>

                                <span>
                                  <i className='fas fa-lock pl-1 gold'></i>
                                </span>
                              </div>
                            </Link>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}

                    <tr>
                      <td>Ownership</td>
                      <td>
                        {asset.ownership && (
                          <ListGroup>
                            {asset.ownership.map((owner, index) => (
                              <Link
                                to={`/company/${owner.companyRef}`}
                                key={index}
                              >
                                <div>
                                  <p className='m-0 text-dark'>
                                    {owner
                                      ? `${owner.name} (${owner.stakePercent}%)`
                                      : '-'}
                                    <span>
                                      <i className='pl-1 fas fa-info-circle text-info'></i>
                                    </span>
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </ListGroup>
                        )}
                      </td>
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
