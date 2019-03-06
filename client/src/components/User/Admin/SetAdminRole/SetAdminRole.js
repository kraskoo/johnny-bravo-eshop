import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../../../services/user';

class SetAdminRole extends Component {
  constructor(props) {
    super(props);
    this.state = { users: null, id: null, hasSubmitted: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(e) {
    const firstOptionValue = e.target.children[0].children[1].children[0].value;
    if (!this.state.id) {
      this.setState({ id: firstOptionValue });
    }

    e.preventDefault();
    const userService = new UserService();
    userService.setToAdminRole(this.state.id ? this.state.id : firstOptionValue).then(body => {
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
    }).catch(error => {
      this.props.toast.error(error.message);
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
            {
              this.state.users && this.state.users.length > 0 ?
                <form onSubmit={this.handleSubmit}>
                  <div className="input-group">
                    <span className="input-group-addon" id="users-addon">Users</span>
                    <select name="id" className="form-control" aria-describedby="users-addon" onChange={this.handleChange}>
                      {
                        this.state.users.map(user => (
                            <option value={user._id} key={user._id}>{user.username}</option>
                          )
                        )
                      }
                    </select>
                  </div>
                  <div className="input-group">
                    <input type="submit" className="btn btn-default" value="Set as Admin" />
                  </div>
                </form> :
                <h3 className="text-danger">Sorry, no users</h3>
            }
        </div>
      </div>
    );
  }
}

export default SetAdminRole;