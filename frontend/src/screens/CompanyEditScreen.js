import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCompanyDetails, updateCompany } from '../actions/companyActions';
import { COMPANY_UPDATE_RESET } from '../constants/companyConstants';

const ProductEditScreen = ({ match, history }) => {
  const companyId = match.params.id;

  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [issuedShares, setIssuedShares] = useState(0);
  const [primaryCommodity, setPrimaryCommodity] = useState('');
  const [website, setWebsite] = useState('');
  // Trading object
  const [exchange, setExchange] = useState('');
  const [ticker, setTicker] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const companyDetails = useSelector((state) => state.companyDetails);
  const { loading, error, company } = companyDetails;

  const companyUpdate = useSelector((state) => state.companyUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = companyUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COMPANY_UPDATE_RESET });
      history.push('/admin/companylist');
    }

    if (!company.name || company._id !== companyId) {
      dispatch(listCompanyDetails(companyId));
    } else {
      setName(company.name);
      setIssuedShares(company.issuedShares);
      setPrimaryCommodity(company.primaryCommodity);
      setWebsite(company.website);
      setExchange(company.trading.exchange);
      setTicker(company.trading.ticker);
      setCurrency(company.trading.currency);
      setPrice(company.trading.price);
      setLogo(company.logo);
    }
  }, [dispatch, history, companyId, company, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);

      setLogo(data);
      setUploading(false);
    } catch (e) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCompany({
        _id: companyId,
        name,
        issuedShares,
        primaryCommodity,
        website,
        logo,
        trading: {
          exchange,
          ticker,
          currency,
          price,
        },
      })
    );
  };

  return (
    <>
      <Link to='/admin/companylist' className='btn btn-light my-3'>
        Go back
      </Link>

      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col sm={3} md={4}>
            <Image src={logo} fluid />
          </Col>
          <Col sm={9} md={8}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='logo'>
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter logo URL'
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                ></Form.Control>
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>

              <Form.Group controlId='issuedShares'>
                <Form.Label>Issued Shares</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter shares'
                  value={issuedShares}
                  onChange={(e) => setIssuedShares(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='primaryCommodity'>
                <Form.Label>Primary Commodity</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Primary Commodity'
                  value={primaryCommodity}
                  onChange={(e) => setPrimaryCommodity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='webiste'>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Website'
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <h1>Update Trading Data</h1>

              <Form.Group controlId='exchange'>
                <Form.Label>Exchange</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Exchange'
                  value={exchange}
                  onChange={(e) => setExchange(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='ticker'>
                <Form.Label>Ticker</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Ticker'
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='currency'>
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Currency'
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductEditScreen;
