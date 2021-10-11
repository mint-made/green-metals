import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listAssetDetails } from '../actions/assetActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const AssetEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const assetId = match.params.id;

  const assetDetails = useSelector((state) => state.assetDetails);
  const { loading, error, asset } = assetDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (!asset.name) {
      dispatch(listAssetDetails(assetId));
    }
  }, [history, userInfo]);

  return (
    <>
      <Row>
        <Col sm={3} md={4}></Col>
        <Col sm={9} md={8}></Col>
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
