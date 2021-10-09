import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CompanyScreen from './screens/CompanyScreen';
import CompareScreen from './screens/CompareScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import CompanyListScreen from './screens/CompanyListScreen';
import CompanyEditScreen from './screens/CompanyEditScreen';
import ExploreCompaniesScreen from './screens/ExploreCompaniesScreen';
import AssetListScreen from './screens/AssetListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-4'>
        <Container>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/company/:id' component={CompanyScreen} />
          <Route path='/compare' component={CompareScreen} />

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route
            path='/admin/companylist'
            component={CompanyListScreen}
            exact
          />
          <Route
            path='/admin/companylist/:metal'
            component={CompanyListScreen}
            exact
          />

          <Route path='/admin/company/:id/edit' component={CompanyEditScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/assets/' component={AssetListScreen} exact />
          <Route path='/assets/:metal' component={AssetListScreen} exact />

          <Route path='/companies/' component={ExploreCompaniesScreen} exact />
          <Route
            path='/companies/:metal'
            component={ExploreCompaniesScreen}
            exact
          />

          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
