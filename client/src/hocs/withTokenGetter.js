import React, { Component } from 'react'
import SessionService from '../services/session';

function withTokenGetter(WrappedComponent) {
  return class WithTokenGetter extends Component {
    constructor(props) {
      super(props);
      this.state = { user: null };
      this.onExistingToken = this.onExistingToken.bind(this);
      this.updateUser = this.updateUser.bind(this);
    }

    updateUser(user) {
      this.setState({ user });
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
      if (token && !this.state.user) {
        this.onExistingToken();
      }
    }

    render() {
      return (
        <WrappedComponent user={this.state.user} updateUser={this.updateUser} />
      );
    }
  }
}

export default withTokenGetter;