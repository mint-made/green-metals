import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Badge,
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCompanyDetails, updateCompany } from '../actions/companyActions';
import { listAssets } from '../actions/assetActions';
import { COMPANY_UPDATE_RESET } from '../constants/companyConstants';
import NumFormat from '../components/NumFormat';
import { getCurrency } from '../actions/currencyActions';
import Meta from '../components/Meta';

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const companyId = match.params.id;

  const [logo, setLogo] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [issuedShares, setIssuedShares] = useState(0);
  const [netCash, setNetCash] = useState(0);
  const [primaryCommodity, setPrimaryCommodity] = useState('');
  const [exchange, setExchange] = useState('');
  const [currency, setCurrency] = useState('');
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [assetRef, setAssetRef] = useState('');
  const [assetName, setAssetName] = useState('');
  const [assetArray, setAssetArray] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [typing, setTyping] = useState(false);

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

  const assetList = useSelector((state) => state.assetList);
  const { loadingAssets, errorAssets, assets } = assetList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successUpdate) {
      dispatch({ type: COMPANY_UPDATE_RESET });
      history.push('/companies');
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
      setNetCash(
        company.finances && company.finances.netCash
          ? company.finances.netCash
          : 0
      );
      setPrimaryCommodity(company.primaryCommodity);
      setWebsite(company.website);
      setExchange(company.trading.exchange);
      setTicker(company.trading.ticker);
      setCurrency(company.trading.currency);
      setPrice(company.trading.price);
      setLogo(company.logo);
      setType(company.type ? company.type : 'Other');
      setAssetArray(company.assets);
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

  // Debounced asset search that will search after 500ms unless the user makes another input to searchTerm
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm) {
        dispatch(listAssets(searchTerm));
        console.log(searchTerm);
      }
      setTyping(false);
    }, 500);
    return () => {
      clearTimeout(timerId);
      setTyping(true);
    };
  }, [searchTerm, dispatch]);

  // Submits the user-selected image and uploads it to AWS S3 to be hosted and saves the path to the image
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

      setLogo(data.imagePath);
      setUploading(false);
    } catch (e) {
      console.error(error);
      setUploading(false);
    }
  };

  // Submits all of the company data to update the db document
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCompany({
        _id: companyId,
        name,
        issuedShares,
        finances: {
          netCash,
        },
        primaryCommodity,
        website,
        logo,
        type,
        mcap: toUSD(mcap(), currency),
        trading: {
          exchange,
          ticker,
          currency,
          price,
        },
        assets: assetArray,
      })
    );
  };

  // Returns a currency based on the exchange selected e.g. returns "£" if "LSE"
  const exchangeCurrency = (exchange) => {
    switch (exchange) {
      case 'NYSE':
        return '$';
      case 'NASDAQ':
        return '$';
      case 'TSX':
        return 'C$';
      case 'ASX':
        return 'A$';
      case 'LSE':
        return '£';
      case 'OTC':
        return '$';
      case 'XTRA':
        return '€';
      case 'MOEX':
        return '₽';
      case 'TSXV':
        return 'C$';
      case 'HKEK':
        return 'HK$';
      case 'CNSX':
        return 'C$';
      default:
        return '$';
    }
  };

  // Generates a mcap from shares
  const mcap = () => Number(issuedShares) * Number(price);

  // Converts currency
  const toUSD = (value, currency) => {
    switch (currency) {
      case 'C$':
        return value / currencyConv.usd.cad;
      case 'A$':
        return value / currencyConv.usd.aud;
      case '£':
        return value / currencyConv.usd.gbp;
      case '₽':
        return value / currencyConv.usd.rub;
      case '€':
        return value / currencyConv.usd.eur;
      case 'HK$':
        return value / currencyConv.usd.hkd;
      default:
        return value;
    }
  };

  // Pushes the selected asset information into the assetArray and clears the asset form data
  const addAssetHandler = () => {
    setAssetArray((assetArray) => [
      ...assetArray,
      {
        assetRef,
        name: assetName,
      },
    ]);
    setAssetName('');
    setAssetRef('');
  };

  return (
    <>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading || loadingCurrency ? (
        <Loader />
      ) : error || errorCurrency ? (
        <Message variant='danger'>{error || errorCurrency}</Message>
      ) : (
        <>
          <Meta
            title={`Edit - ${company.trading.exchange}:${company.trading.ticker}`}
          />
          <Row>
            <Col sm={3} md={4}>
              <Form.Group controlId='logo'>
                <Form.Label>CompanyId</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='companyId'
                  value={companyId}
                  onChange={(e) => console.log(e.target.value)}
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
                  label='File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Link to={`/company/${company._id}`}>
                <Image src={logo} fluid />
              </Link>
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
                      <Form.Label>
                        Issued Shares{' '}
                        <Badge variant='secondary'>
                          <NumFormat number={issuedShares} dp='2' />
                        </Badge>
                      </Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter shares'
                        value={issuedShares}
                        onChange={(e) => setIssuedShares(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='netCash'>
                      <Form.Label>
                        Net Cash{' '}
                        <Badge variant='primary'>
                          $<NumFormat number={netCash} dp='2' />
                        </Badge>
                      </Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter shares'
                        value={netCash}
                        onChange={(e) => setNetCash(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='ontrolSelect1'>
                      <Form.Label>Primary Commodity</Form.Label>
                      <Form.Control
                        as='select'
                        value={primaryCommodity}
                        onChange={(e) => {
                          setPrimaryCommodity(e.target.value);
                        }}
                      >
                        <option value='-'>-</option>
                        <option value='Uranium'>Uranium</option>
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
                        <option value='NASDAQ'>NASDAQ</option>
                        <option value='LSE'>LSE</option>
                        <option value='ASX'>ASX</option>
                        <option value='TSX'>TSX</option>
                        <option value='TSXV'>TSXV</option>
                        <option value='XTRA'>XTRA</option>
                        <option value='MOEX'>MOEX</option>
                        <option value='OTC'>OTC</option>
                        <option value='HKEK'>HKEK</option>
                        <option value='CNSX'>CNSX</option>
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
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Company Type</Form.Label>
                      <Form.Control
                        as='select'
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        <option value='Producer'>Producer</option>
                        <option value='Developer'>Developer</option>
                        <option value='Explorer'>Explorer</option>
                        <option value='Other'>Other</option>
                      </Form.Control>
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
                            <NumFormat
                              number={toUSD(mcap(), currency)}
                              dp='2'
                            />
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
                <Row>
                  <Col>
                    <Form.Group controlId='search'>
                      <Form.Control
                        placeholder='Search Assets'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className='d-flex justify-content-around'>
                    {loadingAssets || typing ? (
                      <Loader size='2' />
                    ) : errorAssets ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <Form.Group controlId='assets'>
                        <Form.Control
                          as='select'
                          value={`${assetRef},${assetName}`}
                          onChange={(e) => {
                            setAssetName(e.target.value.split(',')[1]);
                            setAssetRef(e.target.value.split(',')[0]);
                          }}
                        >
                          <option value='-'>Select Asset</option>
                          {assets.map((asset, index) => (
                            <option
                              key={index}
                              value={asset._id + ',' + asset.name}
                            >
                              {asset.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    )}
                    <div className='d-flex align-items-center mb-3'>
                      <Button
                        variant='success'
                        className='btn-sm px-2 py-1 ml-1 rounded'
                        onClick={() => {
                          addAssetHandler();
                        }}
                      >
                        <i className='fas fa-plus'></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                  <ListGroup>
                    {assetArray.map((owner, index) => (
                      <ListGroup.Item
                        key={index}
                        className='d-flex justify-content-between'
                      >
                        <p className='m-0'>{owner.name}</p>
                        <div className='d-flex align-items-center'>
                          <Button
                            variant='danger'
                            className='btn-sm px-2 py-1 ml-2 rounded'
                            onClick={() => {
                              assetArray.splice(index, 1);
                              setAssetArray([...assetArray]);
                            }}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Row>
                <Button type='submit' variant='success'>
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductEditScreen;
