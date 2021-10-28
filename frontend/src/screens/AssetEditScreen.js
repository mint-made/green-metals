import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Button, Form, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listAssetDetails, updateAsset } from '../actions/assetActions';
import { listCompanies } from '../actions/companyActions';
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
  const [province, setProvince] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [npv, setNpv] = useState('');
  const [npvDiscount, setNpvDiscount] = useState('');
  const [i, setI] = useState('');
  const [mi, setMi] = useState('');
  const [units, setUnits] = useState('');
  const [type, setType] = useState('');
  const [resourceArray, setResourceArray] = useState([]);
  const [stakePercent, setStakePercent] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyRef, setCompanyRef] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [ownershipArray, setOwnershipArray] = useState([]);

  const assetDetails = useSelector((state) => state.assetDetails);
  const { loading, error, asset } = assetDetails;

  const assetUpdate = useSelector((state) => state.assetUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = assetUpdate;

  const companyList = useSelector((state) => state.companyList);
  const { loadingCompanies, errorCompanies, companies } = companyList;

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
      setName(asset.name || '');
      setStage(asset.stage || '');
      setStudy(asset.study || '');
      setNpv((asset.npv && asset.npv.value) || '');
      setNpvDiscount((asset.npv && asset.npv.discount) || '');
      setCountry(asset.location.country || '');
      setProvince(asset.location.province || '');
      setLink(asset.link || '');
      setOwnershipArray(asset.ownership || '');
      setResourceArray(asset.resource || '');
      setImage(asset.image || '');
    }
  }, [dispatch, history, assetId, asset, successUpdate, userInfo]);

  // Debounced company search that will search after 500ms unless the user makes another input to searchTerm
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm) {
        dispatch(listCompanies(searchTerm));
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
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

      setImage(data.imagePath);
      setUploading(false);
    } catch (e) {
      console.error(error);
      setUploading(false);
    }
  };

  // Submits all of the asset data to update the db document
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAsset({
        _id: assetId,
        name,
        stage,
        study,
        npv: { value: npv, discount: npvDiscount },
        location: { country, province },
        link,
        ownership: ownershipArray,
        resource: resourceArray,
        image,
      })
    );
  };

  // Pushes the inputed resource data in to the resource array and resets the resource form data
  const addResourceHandler = () => {
    setResourceArray((resourceArray) => [
      ...resourceArray,
      {
        i,
        mi,
        units,
        type,
      },
    ]);
    setI('');
    setMi('');
    setUnits('');
    setType('');
  };

  // Pushes the inputed ownership data in the ownership array and resets the ownership form data
  const addOwnershipHandler = () => {
    setOwnershipArray((ownershipArray) => [
      ...ownershipArray,
      {
        name: companyName,
        stakePercent,
        companyRef,
      },
    ]);
    setCompanyName('');
    setCompanyRef('');
    setStakePercent('');
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
                        as='select'
                        value={stage}
                        onChange={(e) => {
                          setStage(e.target.value);
                        }}
                      >
                        <option value='-'>-</option>
                        <option value='Exploration'>Exploration</option>
                        <option value='Development'>Development</option>
                        <option value='C&M'>C&M</option>
                        <option value='Production'>Production</option>
                      </Form.Control>
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
                  <Col>
                    <Form.Group controlId='province'>
                      <Form.Label>Province</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter Province'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='link'>
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter Link'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <p className='mb-2'>Ownership</p>
                <Row>
                  <Col>
                    <Form.Group controlId='search'>
                      <Form.Control
                        placeholder='Search Companies'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    {loadingCompanies ? (
                      <Loader />
                    ) : errorCompanies ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <Form.Group controlId='company'>
                        <Form.Control
                          as='select'
                          value={`${companyRef},${companyName}`}
                          onChange={(e) => {
                            setCompanyName(e.target.value.split(',')[1]);
                            setCompanyRef(e.target.value.split(',')[0]);
                          }}
                        >
                          <option value='-'>Select Company</option>
                          {companies.map((company, index) => (
                            <option
                              key={index}
                              value={company._id + ',' + company.name}
                            >
                              {company.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    )}
                  </Col>
                  <Col className='d-flex justify-content-between'>
                    <Form.Group controlId='stakePercent'>
                      <Form.Control
                        type='name'
                        placeholder='Stake Percent'
                        value={stakePercent}
                        onChange={(e) => setStakePercent(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <div className='d-flex align-items-center mb-3'>
                      <Button
                        variant='success'
                        className='btn-sm px-2 py-1 ml-1 rounded'
                        onClick={() => {
                          addOwnershipHandler();
                        }}
                      >
                        <i className='fas fa-plus'></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                  <ListGroup>
                    {ownershipArray.map((owner, index) => (
                      <ListGroup.Item
                        key={index}
                        className='d-flex justify-content-between'
                      >
                        <p className='m-0'>
                          {`${owner.name} - ${owner.stakePercent}%`}
                        </p>
                        <div className='d-flex align-items-center'>
                          <Button
                            variant='danger'
                            className='btn-sm px-2 py-1 ml-2 rounded'
                            onClick={() => {
                              ownershipArray.splice(index, 1);
                              setOwnershipArray([...ownershipArray]);
                            }}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Row>
                <Row>
                  <Col>
                    <Button type='submit' variant='success'>
                      Update
                    </Button>
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
                        <option value='Gold'>Gold</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className='d-flex justify-content-between'>
                    <Form.Group controlId='units'>
                      <Form.Control
                        as='select'
                        placeholder='Units'
                        value={units}
                        onChange={(e) => {
                          setUnits(e.target.value);
                        }}
                      >
                        <option value='-'>-</option>
                        <option value='mt'>mt</option>
                        <option value='moz'>moz</option>
                        <option value='mlbs'>mlbs</option>
                      </Form.Control>
                    </Form.Group>
                    <div className='d-flex align-items-center mb-3'>
                      <Button
                        variant='success'
                        className='btn-sm px-2 py-1 ml-1 rounded'
                        onClick={() => {
                          addResourceHandler();
                        }}
                      >
                        <i className='fas fa-plus'></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                  <ListGroup>
                    {resourceArray.map((r, index) => (
                      <ListGroup.Item
                        key={index}
                        className='d-flex justify-content-between'
                      >
                        <p className='m-0'>
                          {r.i && r.mi
                            ? `${r.i}${r.units} Inf. ${r.mi}${r.units} M+I ${r.type}`
                            : r.i
                            ? `${r.i}${r.units} Inf. ${r.type}`
                            : r.mi
                            ? `${r.mi}${r.units} M+I ${r.type}`
                            : ''}
                        </p>
                        <div className='d-flex align-items-center'>
                          <Button
                            variant='danger'
                            className='btn-sm px-2 py-1 ml-2 rounded'
                            onClick={() => {
                              resourceArray.splice(index, 1);
                              setResourceArray([...resourceArray]);
                            }}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Row>
                <Row className='d-flex justify-content-center'>
                  <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Image URL'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File
                      id='image-file'
                      label='File'
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>
                  <Image src={image} fluid />
                </Row>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </>
  );
};

export default AssetEditScreen;
