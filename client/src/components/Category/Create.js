import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CategoryService from '../../services/category';

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { name: null, hasSubmitted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const categoryService = new CategoryService();
    categoryService.create(this.state).then(body => {
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

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    if ((!this.props.user || (this.props.user && !this.props.user.roles.includes('Admin'))) || this.state.hasSubmitted) {
      return <Redirect to="/" />;
    }

    return (
      <div id="main" className="container">
        <div className="col-md-5 col-centered">
          <h1>Create Category</h1>
          <div className="well">
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="right-space-25">Name</label>
                <input type="text" name="name" className="form-control right-space-25 width-240" placeholder="Name" id="name" onChange={this.handleChange} />
              </div>
              <button type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCategory;