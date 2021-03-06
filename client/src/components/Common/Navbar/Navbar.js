import React, { Fragment, Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import SessionService from '../../../services/session';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.search === '') {
      this.props.toast.error('You cannot search with empty string!');
      return;
    }

    this.setState({ search: '' });
    this.props.history.push(`/device/search/${this.state.search}`);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleLogout(e) {
    e.preventDefault();
    const email = sessionStorage.getItem('email');
    const jwtString = sessionStorage.getItem('token');
    if (email && jwtString) {
      const sessionService = new SessionService();
      sessionService.deleteSession({ jwtString, email }).then(body => {
        if (body.success) {
          this.props.toast.success(body.message);
          this.props.updateUser(null);
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('token');
        } else {
          this.props.toast.error(body.message);
        }
      }).catch(error => {
        this.props.toast.error(error.message);
      });
    } else {
      this.props.toast.error('jwtString or email is missing');
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapsed" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink to="/" className="navbar-brand">Home</NavLink>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapsed">
            <ul className="nav navbar-nav">
              <li><NavLink to="/device/all">All Devices</NavLink></li>
              {
                this.props.user ?
                  <Fragment>
                    {
                      this.props.user.roles.includes('Admin') ?
                        <li><NavLink to="/category/all">All Categories</NavLink></li> :
                        null
                    }
                  </Fragment> :
                  null
              }
            </ul>
            <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="search"
                  className="form-control"
                  placeholder="Search..."
                  value={this.state.search}
                  onChange={this.handleChange} />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>
            </form>
            <NavLink to="/about" className="navbar-brand">About</NavLink>
            <ul className="nav navbar-nav navbar-right">
              {
                this.props.user ?
                  (
                    <Fragment>
                      <ul className="nav navbar-nav">
                        <li className="dropdown">
                          <span className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hello, {this.props.user.username}!<span className="caret"></span></span>
                          <ul className="dropdown-menu">
                            {
                              this.props.user.roles.includes('Admin') ?
                              <Fragment>
                                <li><NavLink to="/user/setadminrole">Set Admin Role</NavLink></li>
                                <li><NavLink to="/category/create">Create Category</NavLink></li>
                                <li><NavLink to="/device/create">Create Device</NavLink></li>
                                <li role="separator" className="divider"></li>
                              </Fragment> : null
                            }
                            <li><span id="logout" onClick={this.handleLogout}>Logout</span></li>
                          </ul>
                        </li>
                      </ul>
                    </Fragment>
                  ) :
                  (
                    <Fragment>
                      <li><NavLink to="/user/register">Register</NavLink></li>
                      <li><NavLink to="/user/login">Login</NavLink></li>
                    </Fragment>
                  )
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);