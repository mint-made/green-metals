import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listAssets, deleteAsset, createAsset } from '../actions/assetActions';
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { ASSET_CREATE_RESET } from '../constants/assetConstants';
import capitalize from '../components/util';

const AssetListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const metal = match.params.metal;
  const keyword = useQuery().get('q') || '';

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
    if (successCreate) {
      dispatch({ type: ASSET_CREATE_RESET });
    }

    dispatch(listAssets(keyword, metal));
  }, [keyword, dispatch, successDelete, metal, history]);

  useEffect(() => {
    if (successCreate && userInfo.isAdmin && createdAsset) {
      history.push(`/admin/asset/${createdAsset._id}/edit`);
    }
  }, [successCreate, createdAsset, history]);

  // Whenever the component is re-rendered and term has changed, run this function
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm) {
        history.push(`${location.pathname}?q=${searchTerm}`);
      }
      if (!searchTerm && keyword) {
        history.push(`${location.pathname}`);
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm, history, location, keyword]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteAsset(id));
    }
  };

  const createAssetHandler = () => {
    dispatch(createAsset());
  };

  return (
    <>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col xs={12} sm={6} md={5} className='d-flex justify-content-center'>
          <Breadcrumb style={{ maxWidth: '300px' }}>
            <Breadcrumb.Item href='/assets'>Assets</Breadcrumb.Item>
            {metal && (
              <Breadcrumb.Item href={`/assets/${metal}`}>
                {capitalize(metal)}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </Col>
        <Col xs={12} sm={6} md={5} className='d-flex justify-content-center'>
          <Form.Group controlId='search' style={{ maxWidth: '300px' }}>
            <Form.Control
              placeholder='Search by Name or location'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        {userInfo && userInfo.isAdmin && (
          <Col md={2} className='text-right d-flex justify-content-end mb-3'>
            <Button
              onClick={createAssetHandler}
              variant='success'
              className='px-3 py-2'
            >
              <i className='fas fa-plus'></i> Asset
            </Button>
          </Col>
        )}
      </Row>

      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading || loadingDelete || loadingCreate ? (
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
                  {asset.resource.map((res, index) => (
                    <p key={index} className='m-0'>
                      {(res.i + res.mi).toFixed(2)}
                      {`${res.units} ${res.type}`}
                    </p>
                  ))}
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
                {userInfo && userInfo.isAdmin && (
                  <td className='p-1 text-center'>
                    <div className='d-flex'>
                      <Button
                        href={`/admin/asset/${asset._id}/edit`}
                        variant='light'
                        className='btn-sm py-1 px-2'
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                      <Button
                        variant='danger'
                        className='btn-sm px-2 py-1'
                        onClick={() => deleteHandler(asset._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AssetListScreen;
