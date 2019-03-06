import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../../services/user';
import SessionService from '../../../services/session';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const userService = new UserService();
    userService.register(this.state).then(registerBody => {
      if (registerBody.success) {
        userService.login({ email: this.state.email, password: this.state.password }).then(loginBody => {
          if (loginBody.success) {
            const token = loginBody.token;
            const email = loginBody.user.email;
            const sessionService = new SessionService();
            const session = { jwtString: token, email };
            sessionService.addSession(session).then(sessionBody => {
              if (sessionBody.success) {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('email', email);
                this.props.updateUser({ ...loginBody.user, token });
                this.props.toast.success(registerBody.message);
              } else {
                this.props.toast.error(sessionBody.message);
              }
            }).catch(error => {
              this.props.toast.error(error.message);
            });
          } else {
            this.props.toast.error(loginBody.message);
          }
        }).catch(error => {
          this.props.toast.error(error.message);
        });
      } else {
        this.props.toast.error(registerBody.message);
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
        <div className="col-md-6">
          <h1>Register Form</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="username-addon">Username</span>
              <input type="text" name="username" className="form-control" placeholder="Username" aria-describedby="username-addon" onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="email-addon">Email</span>
              <input type="email" name="email" className="form-control" placeholder="Email" aria-describedby="email-addon" onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="password-addon">Password</span>
              <input type="password" name="password" className="form-control" placeholder="Password" aria-describedby="password-addon" onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <input type="submit" className="btn btn-default" value="Register" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;