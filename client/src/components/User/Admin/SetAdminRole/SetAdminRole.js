import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../../../services/user';

class SetAdminRole extends Component {
  constructor(props) {
    super(props);
    this.state = { users: null, id: '', hasSubmitted: false };
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
    const userService = new UserService();
    userService.getAllRegularUsers().then(body => {
      this.setState({ users: body.users });
    });
  }

  render() {
    if ((!this.props.user || (this.props.user && !this.props.user.roles.includes('Admin'))) || this.state.hasSubmitted) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="col-md-6">
          <h1>Set Admin Role to Regular User</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="users-addon">Users</span>
              <select name="id" className="form-control" aria-describedby="users-addon" onChange={this.handleChange}>
                {
                  this.state.users && this.state.users.length > 0 ?
                    <Fragment>
                      {
                        this.state.users.map(user => (
                            <option value={user._id} key={user._id}>{user.username}</option>
                          )
                        )
                      }
                    </Fragment> :
                    null
                }
              </select>
            </div>
            <div className="input-group">
              <input type="submit" className="btn btn-default" value="Set as Admin" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SetAdminRole;