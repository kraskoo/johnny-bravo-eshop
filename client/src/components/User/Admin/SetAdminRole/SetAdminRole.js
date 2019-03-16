import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../../../services/user';
import Loading from '../../../Common/Loading';

class SetAdminRole extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { users: null, id: '', hasSubmitted: false, isLoading: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const userService = new UserService();
    userService.setToAdminRole(this.state.id).then(body => {
      if (body.success) {
        this.setState({ hasSubmitted: true });
        this.props.toast.success(body.message);
      } else {
        this.props.toast.error(body.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  componentDidMount() {
    this._isMounted = true;
    const userService = new UserService();
    userService.getAllRegularUsers().then(body => {
      if (body.users.length > 0) {
        if (this._isMounted) {
          this.setState({ id: body.users[0]._id });
        }
      }

      if (this._isMounted) {
        this.setState({ users: body.users, isLoading: false });
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if ((!this.props.user || (this.props.user && !this.props.user.roles.includes('Admin'))) || this.state.hasSubmitted) {
      return <Redirect to="/" />;
    }

    if (this.state.isLoading) {
      return Loading(this.state.isLoading);
    }

    return (
      <div id="main" className="container">
        <div className="col-md-6 col-centered">
          <h1>Set Admin Role to Regular User</h1>
            {
              this.state.users && this.state.users.length > 0 ?
                <div className="well">
                  <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="users" className="right-space-25">Name</label>
                      <select name="id" className="form-control width-300 right-space-25" id="users" onChange={this.handleChange}>
                        {
                          this.state.users.map(user => (
                              <option value={user._id} key={user._id}>{user.username}</option>
                            )
                          )
                        }
                      </select>
                    </div>
                    <button type="submit" className="btn btn-default">Set as Admin</button>
                  </form>
                </div> :
                <h3 className="text-danger">Sorry, no users</h3>
            }
        </div>
      </div>
    );
  }
}

export default SetAdminRole;