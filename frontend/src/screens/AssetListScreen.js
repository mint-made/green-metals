import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listAssets, deleteAsset, createAsset } from '../actions/assetActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { ASSET_CREATE_RESET } from '../constants/assetConstants';
import capitalize from '../components/util';

const AssetListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const metal = match.params.metal;

  const [searchTerm, setSearchTerm] = useState('');

  const assetList = useSelector((state) => state.assetList);
  const { loading, error, assets } = assetList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const assetDelete = useSelector((state) => state.assetDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = assetDelete;

  const assetCreate = useSelector((state) => state.assetCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    asset: createdAsset,
  } = assetCreate;

  useEffect(() => {
    dispatch({ type: ASSET_CREATE_RESET });

    dispatch(listAssets());

    if (successCreate) {
      history.push(`/admin/asset/${createdAsset._id}/edit`);
    } else {
      dispatch(listAssets(metal));
    }
  }, [dispatch, successDelete, createdAsset, successCreate, history, metal]);

  // Whenever the component is re-rendered and term has changed, run this function
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm) {
        dispatch(listAssets(searchTerm));
        console.log(searchTerm);
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm, dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteAsset(id));
    }
  };

  const createCompanyHandler = () => {
    dispatch(createAsset());
  };
  console.log(assets);
  return (
    <>
      <Row className='align-items-center'>
        <Col xs={4}>
          <Breadcrumb>
            <Breadcrumb.Item href='/assets'>Assets</Breadcrumb.Item>
            {metal && (
              <Breadcrumb.Item href={`/assets/${metal}`}>
                {capitalize(metal)}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </Col>
        <Col>
          <Col>
            <Form.Group controlId='search'>
              <Form.Control
                placeholder='Search Companies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Col>
        <Col className='text-right d-flex justify-content-around my-3'>
          {userInfo && userInfo.isAdmin && (
            <Button onClick={createCompanyHandler} variant='success'>
              <i className='fas fa-plus'></i> Create Company
            </Button>
          )}
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Name</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Location</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Stage</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Resource</h5>
              </th>
              <th className='p-1'>
                <h5 className='m-0 text-center'>Owner</h5>
              </th>
              <th className='p-1'></th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td className='p-0'>
                  <Link to={`/asset/${asset._id}`}>
                    <div className='d-flex justify-content-between p-2 '>
                      <p className='mb-0 text-dark'>
                        {asset.name}
                        <span>
                          <i className='pl-1 fas fa-info-circle text-info'></i>
                        </span>
                      </p>
                    </div>
                  </Link>
                </td>
                <td className='p-2'>{asset.location.country}</td>
                <td className='p-2'>{asset.stage}</td>
                <td className='p-2'>
                  {asset.resource.map(
                    (res) => `${res.i + res.mi}${res.units} ${res.type}`
                  )}
                </td>
                <td className='p-2'>
                  {asset.ownership.map((owner, index) => (
                    <Link to={`/company/${owner.companyRef}`} key={index}>
                      <div className=' '>
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
                </td>
                <td className='p-2'>
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <LinkContainer to={`/admin/asset/${asset._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(asset._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AssetListScreen;
