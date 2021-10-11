import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listAssetDetails } from '../actions/assetActions';
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(asset);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (!asset.name) {
      dispatch(listAssetDetails(assetId));
    } else {
      setName(asset.name);
      setStage(asset.stage);
      setStudy(asset.study);
    }
  }, [history, userInfo]);

  const submitHandler = () => {
    console.log('Form submitted');
  };

  return (
    <>
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
          <Form onSubmit={submitHandler}>
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
          </Form>
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
    </>
  );
};

export default AssetEditScreen;
