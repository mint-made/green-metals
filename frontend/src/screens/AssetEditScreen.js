import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listAssetDetails, updateAsset } from '../actions/assetActions';
import { ASSET_UPDATE_RESET } from '../constants/assetConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const AssetEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const assetId = match.params.id;
  const [name, setName] = useState('');
  const [stage, setStage] = useState('');
  const [study, setStudy] = useState('');

  const assetDetails = useSelector((state) => state.assetDetails);
  const { loading, error, asset } = assetDetails;

  const assetUpdate = useSelector((state) => state.assetUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = assetUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successUpdate) {
      dispatch({ type: ASSET_UPDATE_RESET });
      history.push('/assets');
    }

    if (!asset.name || asset._id !== assetId) {
      dispatch(listAssetDetails(assetId));
    } else {
      setName(asset.name);
      setStage(asset.stage);
      setStudy(asset.study);
    }
  }, [dispatch, history, assetId, asset, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAsset({
        _id: assetId,
        name,
        stage,
        study,
      })
    );
  };

  return (
    <>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Row>
              <Col sm={3} md={4}>
                <Form.Group controlId='logo'>
                  <Form.Label>AssetId</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='assetId'
                    value={assetId}
                    onChange={(e) => console.log(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={9} md={8}>
                <Row>
                  <Col>
                    <Form.Group controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='stage'>
                      <Form.Label>Stage</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter Website'
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId='Study'>
                      <Form.Label>Study</Form.Label>
                      <Form.Control
                        as='select'
                        value={study}
                        onChange={(e) => {
                          setStudy(e.target.value);
                        }}
                      >
                        <option value='-'>-</option>
                        <option value='PFS'>PFS</option>
                        <option value='DFS'>DFS</option>
                        <option value='BFS'>BFS</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>

            <Button type='submit' variant='success'>
              Update
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default AssetEditScreen;
