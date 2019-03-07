import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as NavBar, Nav, NavDropdown } from 'react-bootstrap';
import SessionService from '../../../services/session';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.onClickListItem = this.onClickListItem.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    const email = sessionStorage.getItem('email');
    const jwtString = sessionStorage.getItem('token');
    if (email && jwtString) {
      const sessionService = new SessionService();
      sessionService.deleteSession({ jwtString, email }).then(body => {
        if (body.success) {
          this.props.toast.success('Successfully logout.');
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
  
  // This function fix incorrect behavior of NavDropdown
  onClickListItem(id) {
    document.getElementById(id).click();
  }

  render() {
    return (
      <NavBar>
        <NavBar.Header>
          <NavBar.Brand>
            <NavLink to="/" className="navbar-brand">Home</NavLink>
          </NavBar.Brand>
          <NavBar.Toggle />
        </NavBar.Header>
        <NavBar.Collapse>
          <Nav>
            {
              this.props.user ?
                <Fragment>
                  <li><NavLink to="/category/all">All Category</NavLink></li>
                  <li><NavLink to="/device/all">All Devices</NavLink></li>
                </Fragment> :
                null
            }
          </Nav>
          <Nav pullRight>
          {
            this.props.user ?
              <NavDropdown title={`Hello, ${this.props.user.username}!`} id="user-dropdown">
                  {
                    this.props.user.roles.includes('Admin') ?
                      <Fragment>
                        <li onClick={() => this.onClickListItem('user-dropdown')}><NavLink to="/user/setadminrole">Set Admin Role</NavLink></li>
                        <li onClick={() => this.onClickListItem('user-dropdown')}><NavLink to="/category/create">Create Category</NavLink></li>
                        <li onClick={() => this.onClickListItem('user-dropdown')}><NavLink to="/device/create">Create Device</NavLink></li>
                        <li role="separator" className="divider"></li>
                      </Fragment> : null
                  }
                  <li><span id="logout" onClick={this.handleLogout}>Logout</span></li>
              </NavDropdown> :
              <Fragment>
                <li><NavLink to="/user/register">Register</NavLink></li>
                <li><NavLink to="/user/login">Login</NavLink></li>
              </Fragment>
          }
          </Nav>
        </NavBar.Collapse>
      </NavBar>
    );
  }
}

export default Navbar;