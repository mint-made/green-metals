import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Jumbotron,
  Row,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Meta from '../components/Meta';
import Message from '../components/Message';

const SubscribeScreen = ({ history }) => {
  const [showMessage, setShowMessage] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const signUpHandler = () => {
    if (!userInfo) {
      history.push('/register');
    } else if (userInfo) {
      setShowMessage(true);
    }
  };

  return (
    <>
      <Meta title='Subscribe' />
      {showMessage && (
        <Message variant='danger'>
          You already have an account and are currently logged in
        </Message>
      )}
      <Row>
        <Col className='d-flex justify-content-center'>
          <Jumbotron
            fluid
            className='bg-light  rounded border-0 pt-5'
            style={{
              backgroundImage:
                "url('https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/112353dd3f5f3d62dfdcfce6fd4a8935')",
              backgroundSize: 'cover',
              maxHeight: '400px',
              maxWidth: '700px',
            }}
          >
            <Row>
              {' '}
              <Container className='d-flex justify-content-start'>
                <Col xs={5}>
                  <h1 className='text-center'>Sign Up Today</h1>
                  <p className='d-none d-sm-block text-center'>
                    To get all the latest information and details about the
                    companies you are most interested in, select a option below.
                  </p>
                </Col>
              </Container>
            </Row>
          </Jumbotron>
        </Col>
      </Row>

      <Row className='d-flex justify-content-center'>
        <Col xs={12} sm={6} className='mb-4 d-flex justify-content-center'>
          <Card className='rounded home-cards' style={{ height: '100%' }}>
            <Card.Body className='d-flex flex-column justify-content-between'>
              <Card.Title className='text-center'>
                <h3>Free Tier</h3>
              </Card.Title>
              <p>
                <i className='fas fa-check pr-2' style={{ color: 'green' }}></i>
                Access to 100s of companies involved in the zero-carbon economy
              </p>
              <p>
                <i className='fas fa-check pr-2' style={{ color: 'green' }}></i>
                Basic information about the assets each company owns
              </p>
              <p>
                <i className='fas fa-check pr-2' style={{ color: 'green' }}></i>
                Build comparison tables to find the best valued companies
              </p>
              <Button variant='outline-primary' onClick={signUpHandler}>
                Sign Up now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} className='mb-4 d-flex justify-content-center'>
          <Card className='rounded home-cards' style={{ height: '100%' }}>
            <Card.Body className='d-flex flex-column justify-content-between'>
              <Card.Title className='text-center'>
                <h3>Premium</h3>
              </Card.Title>
              <p>
                <i className='fas fa-check pr-2' style={{ color: 'green' }}></i>
                In-depth information about companies, their finances and their
                assets
              </p>
              <p>
                <i className='fas fa-check pr-2' style={{ color: 'green' }}></i>
                Be the first to try out new features as they are released
              </p>
              <p>
                <i className='fas fa-check pr-2' style={{ color: 'green' }}></i>
                Only £5 / month
              </p>
              <OverlayTrigger
                placement='top'
                overlay={
                  <Tooltip id='coming-soon'>
                    <strong>Premium</strong> will be coming soon.
                  </Tooltip>
                }
              >
                <Button variant='primary'>Try Premium</Button>
              </OverlayTrigger>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default SubscribeScreen;
