import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import UserService from '../../../services/user';
import SessionService from '../../../services/session';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
            this.props.toast.success(userBody.message);
          } else {
            this.props.toast.error(sessionBody.message);
          }
        }).catch(error => {
          this.props.toast.error(error.message);
        });
      } else {
        this.props.toast.error(userBody.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="col-md-6 col-centered">
          <h1>Login</h1>
          <div className="well">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="form-control" placeholder="Email" id="email" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" aria-describedby="password" onChange={this.handleChange} />
              </div>
              <p>If you don't have an account, you can register from <Link to="/user/register">here</Link></p>
              <button type="submit" className="btn btn-default">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;