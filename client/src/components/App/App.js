import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import { UserProvider, UserConsumer, userValue } from '../../contexts/UserContext';

const HomeWithUserContext = () => {
  return (
    <UserConsumer>
      {(value) => (<Home user={value.user} updateUser={value.updateUser} />)}
    </UserConsumer>
  );
};

const RegisterWithUserContext = () => {
  return (
    <UserConsumer>
      {(value) => (<Register user={value.user} updateUser={value.updateUser} />)}
    </UserConsumer>
  );
}

const LoginWithUserContext = () => {
  return (
    <UserConsumer>
      {(value) => (<Login user={value.user} updateUser={value.updateUser} />)}
    </UserConsumer>
  );
}

const NavbarWithUserContext = () => {
  return (
    <UserConsumer>
      {(value) => (<Navbar user={value.user} updateUser={value.updateUser} />)}
    </UserConsumer>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: userValue.user };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user) {
    userValue.user = user;
    this.setState({ user });
  }

  render() {
    return (
      <Router>
        <Fragment>
          <UserProvider value={{ user: this.state.user, updateUser: this.updateUser }}>
            <NavbarWithUserContext />
            <Switch>
              <Route path="/" exact component={HomeWithUserContext} />
              <Route path="/user/login" exact component={LoginWithUserContext} />
              <Route path="/user/register" exact component={RegisterWithUserContext} />
              <Route component={NotFound} />
            </Switch>
          </UserProvider>
        </Fragment>
      </Router>
    );
  }
}

export default App;