import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CategoryService from '../../services/category';
import Loading from '../Common/Loading';

class DeleteCategory extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { category: '', name: '', hasSubmitted: false, isLoading: true };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const categoryService = new CategoryService();
    const id = this.props.match.params.id;
    categoryService.get(id).then(body => {
      if (body.success) {
        if (this._isMounted) {
          this.setState({ category: body.category, name: body.category.name, isLoading: false });
        }
      } else {
        this.props.toast.error(body.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const categoryService = new CategoryService();
    categoryService.delete(this.props.match.params.id).then(body => {
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

  render() {
    if ((!this.props.user || (this.props.user && !this.props.user.roles.includes('Admin'))) || this.state.hasSubmitted) {
      return <Redirect to="/" />;
    }

    if (this.state.isLoading) {
      return Loading(this.state.isLoading);
    }
    
    return (
      <div className="container">
        <div className="col-md-5 col-centered">
          <h1>Delete Category</h1>
          <div className="well">
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="right-space-25">Name</label>
                <input type="text" name="name" className="form-control right-space-25 width-240" placeholder="Name" id="name" onChange={this.handleChange} value={this.state.name} disabled />
              </div>
              <button type="submit" className="btn btn-danger">Delete</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteCategory;