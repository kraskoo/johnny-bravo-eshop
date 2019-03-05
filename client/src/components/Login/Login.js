import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../services/user';
import SessionService from '../../services/session';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onExistingToken = this.onExistingToken.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const userService = new UserService();
    userService.login(this.state).then(userBody => {
      if (userBody.success) {
        const token = userBody.token;
        const email = userBody.user.email;
        const sessionService = new SessionService();
        const session = { jwtString: token, email };
        sessionService.addSession(session).then(sessionBody => {
          if (sessionBody.success) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('email', email);
            this.props.updateUser({ ...userBody.user, token });
          }
        });
      }
    });
  }

  onExistingToken() {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    const sessionService = new SessionService();
    sessionService.getSession({ jwtString: token, email }).then(body => {
      if (body.success) {
        this.props.updateUser({ ...body.user, token: body.token });
      }
    });
  }

  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token && !this.props.user) {
      this.onExistingToken();
    }
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="col-md-6">
          <h1>Login Form</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="email-addon">Email</span>
              <input type="email" name="email" className="form-control" placeholder="Email" aria-describedby="email-addon" onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="password-addon">Password</span>
              <input type="password" name="password" className="form-control" placeholder="Password" aria-describedby="password-addon" onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <input type="submit" className="btn btn-default" value="Log In" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;