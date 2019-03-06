import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Login from '../User/Login/Login';
import Register from '../User/Register/Register';
import SetAdminRole from '../User/Admin/SetAdminRole/SetAdminRole';
import NotFound from '../NotFound/NotFound';

import { UserProvider, UserConsumer } from '../../contexts/UserContext';

import withConsumer from '../../hocs/withConsumer';
import withTokenGetter from '../../hocs/withTokenGetter';

const HomeWithUserConsumer = withConsumer(Home, UserConsumer);
const RegisterWithUserConsumer = withConsumer(Register, UserConsumer);
const LoginWithUserConsumer = withConsumer(Login, UserConsumer);
const SetAdminRoleWithUserConsumer = withConsumer(SetAdminRole, UserConsumer);
const NavbarWithUserContext = withConsumer(Navbar, UserConsumer);


class AppBase extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <UserProvider value={{ user: this.props.user, updateUser: this.props.updateUser }}>
            <NavbarWithUserContext />
            <Switch>
              <Route path="/" exact component={HomeWithUserConsumer} />
              <Route path="/user/login" exact component={LoginWithUserConsumer} />
              <Route path="/user/register" exact component={RegisterWithUserConsumer} />
              <Route path="/user/setadminrole" exact component={SetAdminRoleWithUserConsumer} />
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