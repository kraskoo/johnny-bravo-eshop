import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import SessionService from '../../services/session';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    const email = sessionStorage.getItem('email');
    const jwtString = sessionStorage.getItem('token');
    if (email && jwtString) {
      const sessionService = new SessionService();
      sessionService.deleteSession({ jwtString, email }).then(body => {
        if (body.success) {
          this.props.updateUser(null);
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('token');
        }
      });
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
            {/* <ul className="nav navbar-nav">
              <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="#">Link</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form> */}
            <ul className="nav navbar-nav navbar-right">
              {
                this.props.user ?
                  (
                    <Fragment>
                      <li><span>Hello, {this.props.user.username}!</span></li>
                      <li><span id="logout" onClick={this.handleLogout}>Logout</span></li>
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

export default Navbar;