import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import { UserProvider, UserConsumer } from '../../contexts/UserContext';

import withConsumer from '../../hocs/withConsumer';
import withTokenGetter from '../../hocs/withTokenGetter';

const HomeWithUserContext = withConsumer(Home, UserConsumer);
const RegisterWithUserContext = withConsumer(Register, UserConsumer);
const LoginWithUserContext = withConsumer(Login, UserConsumer);
const NavbarWithUserContext = withConsumer(Navbar, UserConsumer);

class AppBase extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <UserProvider value={{ user: this.props.user, updateUser: this.props.updateUser }}>
            <NavbarWithUserContext />
            <Switch>
              <Route path="/" exact component={HomeWithUserContext} />
              <Route path="/user/login" exact component={LoginWithUserContext} />
              <Route path="/user/register" exact component={RegisterWithUserContext} />
              <Route component={NotFound} />
            </Switch>
          </UserProvider>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

const App = withTokenGetter(AppBase);

export default App;