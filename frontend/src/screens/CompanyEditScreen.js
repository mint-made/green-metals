import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listCompanyDetails, updateCompany } from '../actions/companyActions';

const ProductEditScreen = ({ match }) => {
  const companyId = match.params.id;

  const [name, setName] = useState('');
  const [issuedShares, setIssuedShares] = useState(0);
  const [primaryCommodity, setPrimaryCommodity] = useState('');
  const [website, setWebsite] = useState('');
  // Trading object
  const [exchange, setExchange] = useState('');
  const [ticker, setTicker] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();

  const companyDetails = useSelector((state) => state.companyDetails);
  const { loading, error, company } = companyDetails;

  useEffect(() => {
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
    }
  }, [dispatch, companyId, company]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCompany({
        _id: companyId,
        name,
        issuedShares,
        primaryCommodity,
        website,
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
      <FormContainer>
        <h1>Update Company Info</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
