import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../actions/userActions';
import { changeCurrency } from '../actions/currencyActions';

const Header = () => {
  const dispatch = useDispatch();
  const [currencyIcon, setCurrencyIcon] = useState('Local$');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currencyList = useSelector((state) => state.currencyList);
  const { currency } = currencyList;

  useEffect(() => {
    if (!currency.selected) {
      dispatch(changeCurrency('local'));
    } else {
      setCurrencyIcon(genCurrencyIcon(currency.selected));
    }
  }, [dispatch, currency]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  //
  const curencyHandler = (value) => {
    const currency = value.substring(1);
    dispatch(changeCurrency(currency));
  };

  const genCurrencyIcon = (currencyText) => {
    if (currencyText === 'gbp') {
      return `£${currencyText}`;
    } else {
      return `$${currencyText}`;
    }
  };

  return (
    <header>
      <Navbar
        bg='secondary'
        variant='dark'
        expand='md'
        collapseOnSelect
        sticky='top'
        className='py-3'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Green Metals</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown title='Companies' id='companies' className='mr-2'>
                <LinkContainer to='/companies/lithium'>
                  <NavDropdown.Item>Lithium</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/companies/rees'>
                  <NavDropdown.Item>REEs</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/companies/nickel'>
                  <NavDropdown.Item>Nickel</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/companies/copper'>
                  <NavDropdown.Item>Copper</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/companies/potash'>
                  <NavDropdown.Item>Potash</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/companies/scandium'>
                  <NavDropdown.Item>Scandium</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown title='Assets' id='assets' className='mr-2'>
                <LinkContainer to='/assets/lithium'>
                  <NavDropdown.Item>Lithium</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/assets/treo'>
                  <NavDropdown.Item>REEs</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/assets/nickel'>
                  <NavDropdown.Item>Nickel</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/assets/copper'>
                  <NavDropdown.Item>Copper</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/assets/k2o'>
                  <NavDropdown.Item>Potash</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/assets/scandium'>
                  <NavDropdown.Item>Scandium</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown
                className='mr-0'
                title={currencyIcon}
                id='username'
                style={{ minWidth: '77px' }}
              >
                {['$local', '$usd', '£gbp', '$aud', '$cad', '€eur', '₽rub'].map(
                  (item, index) => (
                    <NavDropdown.Item
                      key={index}
                      onClick={(e) => curencyHandler(item)}
                    >
                      {item.toUpperCase()}
                    </NavDropdown.Item>
                  )
                )}
              </NavDropdown>
              <LinkContainer to='/compare'>
                <Nav.Link>
                  <i className='fas fa-chart-pie'></i>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={
                    <>
                      <i className='fas fa-user'></i>
                    </>
                  }
                  id='username'
                  className='mr-0'
                >
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
