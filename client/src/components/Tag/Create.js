import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TagService from '../../services/tag';

class CreateTag extends Component {
  constructor(props) {
    super(props);
    this.state = { name: null, hasSubmitted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const tagService = new TagService();
    tagService.create(this.state).then(body => {
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
      <div className="container">
        <div className="col-md-6">
          <h1>Create Tag</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="name-addon">Name</span>
              <input type="text" name="name" className="form-control" placeholder="Name" aria-describedby="name-addon" onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <input type="submit" className="btn btn-default" value="Create" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTag;