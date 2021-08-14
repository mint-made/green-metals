import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Image, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCompanyDetails, updateCompany } from '../actions/companyActions';
import { COMPANY_UPDATE_RESET } from '../constants/companyConstants';
import NumFormat from '../components/NumFormat';
import { getCurrency } from '../actions/currencyActions';

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();

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

  const companyDetails = useSelector((state) => state.companyDetails);
  const { loading, error, company } = companyDetails;

  const companyUpdate = useSelector((state) => state.companyUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = companyUpdate;

  const currencyList = useSelector((state) => state.currencyList);
  const {
    loading: loadingCurrency,
    error: errorCurrency,
    currency: currencyConv,
  } = currencyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successUpdate) {
      dispatch({ type: COMPANY_UPDATE_RESET });
      history.push('/admin/companylist');
    }

    if (!company.name || company._id !== companyId) {
      dispatch(listCompanyDetails(companyId));
      if (!currencyConv.usd) {
        console.log(currencyConv);
        dispatch(getCurrency());
      }
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
  }, [
    dispatch,
    history,
    companyId,
    company,
    successUpdate,
    currencyConv,
    userInfo,
  ]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
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
        mcap: toUSD(mcap(), currency),
        trading: {
          exchange,
          ticker,
          currency,
          price,
        },
      })
    );
  };

  const exchangeCurrency = (exchange) => {
    switch (exchange) {
      case 'NYSE':
        return '$';
      case 'TSX':
        return 'C$';
      case 'ASX':
        return 'A$';
      case 'LSE':
        return '£';
      case 'OTC':
        return '$';
      default:
        return '$';
    }
  };
  const mcap = () => issuedShares * Number(price);

  const toUSD = (value, currency) => {
    switch (currency) {
      case 'C$':
        return value / currencyConv.usd.cad;
      case 'A$':
        return value / currencyConv.usd.aud;
      case '£':
        return value / currencyConv.usd.gbp;
      default:
        return value;
    }
  };

  return (
    <>
      <Link to='/admin/companylist' className='btn btn-light my-3'>
        Go back
      </Link>

      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading || loadingCurrency ? (
        <Loader />
      ) : error || errorCurrency ? (
        <Message variant='danger'>{error || errorCurrency}</Message>
      ) : (
        <Row>
          <Col sm={3} md={4}>
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
                label='File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Image src={logo} fluid />
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
                  <Form.Group controlId='webiste'>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter Website'
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='issuedShares'>
                    <Form.Label>Issued Shares</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter shares'
                      value={issuedShares}
                      onChange={(e) => setIssuedShares(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='primaryCommodity'>
                    <Form.Label>Primary Commodity</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter Primary Commodity'
                      value={primaryCommodity}
                      onChange={(e) => setPrimaryCommodity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='exampleForm.ControlSelect1'>
                    <Form.Label>Exchange</Form.Label>
                    <Form.Control
                      as='select'
                      value={exchange}
                      onChange={(e) => {
                        setExchange(e.target.value);
                        setCurrency(exchangeCurrency(e.target.value));
                      }}
                    >
                      <option value='NYSE'>NYSE</option>
                      <option value='LSE'>LSE</option>
                      <option value='ASX'>ASX</option>
                      <option value='TSX'>TSX</option>
                      <option value='OTC'>OTC</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='ticker'>
                    <Form.Label>Ticker</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter Ticker'
                      value={ticker}
                      onChange={(e) => setTicker(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='price'>
                    <Form.Label>Price ({currency})</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter Price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col className='text-center'>
                  {currency !== '$' && (
                    <>
                      <div>Mcap (USD$)</div>
                      <h3 className='mt-0 p-0'>
                        <Badge variant='primary'>
                          $
                          <NumFormat number={toUSD(mcap(), currency)} dp='2' />
                        </Badge>
                      </h3>
                    </>
                  )}
                </Col>
                <Col className='text-center'>
                  <div>Mcap ({currency})</div>
                  <h3 className='mt-0 p-0'>
                    <Badge variant='primary'>
                      {currency}
                      <NumFormat number={mcap()} dp='2' />
                    </Badge>
                  </h3>
                </Col>
              </Row>
              <Button type='submit' variant='success'>
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
