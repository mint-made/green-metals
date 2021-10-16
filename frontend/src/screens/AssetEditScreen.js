import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
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
  const [country, setCountry] = useState('');
  const [npv, setNpv] = useState(0);
  const [npvDiscount, setNpvDiscount] = useState(8);
  const [i, setI] = useState('');
  const [mi, setMi] = useState('');
  const [units, setUnits] = useState('');
  const [type, setType] = useState('');

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
      setCountry(asset.location.country);
      if (asset.npv) {
        setNpv(asset.npv.value);
        setNpvDiscount(asset.npv.discount);
      }
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
        location: { country },
        npv: { value: npv, discount: npvDiscount },
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
                        placeholder='Enter Stage'
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
                  <Col>
                    <Form.Group controlId='NPV'>
                      <Form.Label>NPV</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter NPV'
                        value={npv}
                        onChange={(e) => setNpv(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='NPV discount'>
                      <Form.Label>NPV discount</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='NPV discount'
                        value={npvDiscount}
                        onChange={(e) => setNpvDiscount(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId='country'>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col sm={3} md={4}>
                <p className='mb-2'>Resource</p>
                <Row>
                  <Col>
                    <Form.Group controlId='i'>
                      <Form.Control
                        type='name'
                        placeholder='Infered'
                        value={i}
                        onChange={(e) => setI(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='mi'>
                      <Form.Control
                        type='name'
                        placeholder='M+I'
                        value={mi}
                        onChange={(e) => setMi(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId='units'>
                      <Form.Control
                        type='name'
                        placeholder='Units'
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='type'>
                      <Form.Control
                        as='select'
                        placeholder='Type'
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        <option value='-'>-</option>
                        <option value='Lithium'>Lithium</option>
                        <option value='REEs'>REEs</option>
                        <option value='Nickel'>Nickel</option>
                        <option value='Copper'>Copper</option>
                        <option value='Platinum'>Platinum</option>
                        <option value='Potash'>Potash</option>
                        <option value='Scandium'>Scandium</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
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
