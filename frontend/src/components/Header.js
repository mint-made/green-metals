import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../actions/userActions';
import { changeCurrency, getCurrency } from '../actions/currencyActions';

const Header = () => {
  const [currencyIcon, setCurrencyIcon] = useState('Local$');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currencyList = useSelector((state) => state.currencyList);
  const { currency } = currencyList;

  useEffect(() => {
    // if (!currency.usd) {
    //   dispatch(getCurrency());
    // } else {
    //   console.log('currency present');
    // }
  }, [dispatch, currency]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const curencyHandler = (value) => {
    const currency = value.substring(1);
    dispatch(changeCurrency(currency));
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/explore'>
            <Navbar.Brand>Green Metals</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown title='Explore Companies' id='username'>
                <LinkContainer to='/explore/lithium'>
                  <NavDropdown.Item>Lithium</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/explore/rees'>
                  <NavDropdown.Item>REEs</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/explore/nickel'>
                  <NavDropdown.Item>Nickel</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/explore/copper'>
                  <NavDropdown.Item>Copper</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to='/compare'>
                <Nav.Link>
                  <i className='fas fa-chart-pie'></i> Compare
                </Nav.Link>
              </LinkContainer>

              <NavDropdown className='mr-0' title={currencyIcon} id='username'>
                {['$Local', '$AUD', '$CAD', '£GBP', '$USD'].map(
                  (item, index) => (
                    <NavDropdown.Item
                      key={index}
                      onClick={(e) => curencyHandler(item)}
                    >
                      {item}
                    </NavDropdown.Item>
                  )
                )}
              </NavDropdown>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  {userInfo && userInfo.isAdmin && (
                    <>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/companylist'>
                        <NavDropdown.Item>Companies</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
