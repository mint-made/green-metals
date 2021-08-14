import React from 'react';
import { Button, Card, Col, Container, Jumbotron, Row } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Jumbotron
            fluid
            className='bg-light  rounded border-0'
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
              backgroundSize: 'cover',
              maxHeight: '450px',
              maxWidth: '700px',
            }}
          >
            <Row>
              {' '}
              <Container className='d-flex justify-content-end'>
                <Col xs={6}>
                  <h1 className='text-center'>Zero Carbon Future</h1>
                  <p className='d-none d-sm-block'>
                    To achieve Zero-Carbon, radical change in energy
                    infrastructure is needed, requiring vast quantities of
                    critical metals, such as Lithium, Copper, Nickel and REEs.
                  </p>
                  <div className='d-flex justify-content-center'>
                    <Button variant='primary' href='/explore/'>
                      Explore Companies
                    </Button>
                  </div>
                </Col>
              </Container>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className='rounded'>
            <Card.Img
              variant='top'
              src='https://images.pexels.com/photos/5279317/pexels-photo-5279317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
              className='rounded-top'
            />
            <Card.Body>
              <Card.Title>Copper</Card.Title>
              <Card.Text>
                Everything which is to be electrified requires copper, making
                copper completely indispensable in the green transition.
              </Card.Text>
              <Button variant='primary' href='/explore/copper'>
                Explore Copper
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='rounded'>
            <Card.Img
              variant='top'
              src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/66ad278b6fedd11773328fa3cf3dbc07'
              className='rounded-top'
            />
            <Card.Body>
              <Card.Title>Rare Earths (REEs)</Card.Title>
              <Card.Text>
                REEs applications include batteries, electric motors, wind
                turbines, catalysers and efficient LED,
              </Card.Text>
              <Button variant='primary' href='/explore/rees'>
                Explore REEs
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='rounded'>
            <Card.Img
              variant='top'
              src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/19239f5c09b9cb395961a409e6f41cbf'
              className='rounded-top'
            />
            <Card.Body>
              <Card.Title>Lithium</Card.Title>
              <Card.Text>
                With increasing electrification of transport and growth in
                consumer technology, demand for lithium is only set to grow
              </Card.Text>
              <Button variant='primary' href='/explore/lithium'>
                Explore Lithium
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='rounded'>
            <Card.Img
              variant='top'
              src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/01f044642ab38a0db9db336153148b0e'
              className='rounded-top'
            />
            <Card.Body>
              <Card.Title>Nickel</Card.Title>
              <Card.Text>
                Primarily used to make stainless steel, Nickel is also a key
                component of future battery tech.
              </Card.Text>
              <Button variant='primary' href='/explore/nickel'>
                Explore Nickel
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
