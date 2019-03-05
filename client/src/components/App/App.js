import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import { UserProvider, UserConsumer, userValue } from '../../contexts/UserContext';
import withConsumer from '../../hocs/withConsumer';
import SessionService from '../../services/session';
import Footer from '../Footer/Footer';

const HomeWithUserContext = withConsumer(Home, UserConsumer);
const RegisterWithUserContext = withConsumer(Register, UserConsumer);
const LoginWithUserContext = withConsumer(Login, UserConsumer);
const NavbarWithUserContext = withConsumer(Navbar, UserConsumer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: userValue.user };
    this.updateUser = this.updateUser.bind(this);
    this.onExistingToken = this.onExistingToken.bind(this);
  }

  onExistingToken() {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    const sessionService = new SessionService();
    sessionService.getSession({ jwtString: token, email }).then(body => {
      if (body.success) {
        this.updateUser({ ...body.user, token: body.token });
      }
    });
  }

  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token && !this.props.user) {
      this.onExistingToken();
    }
  }

  updateUser(user) {
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
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;