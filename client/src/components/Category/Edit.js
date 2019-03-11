import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CategoryService from '../../services/category';
import Loading from '../Common/Loading';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { category: '', name: '', hasSubmitted: false, isLoading: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const categoryService = new CategoryService();
    categoryService.get(this.props.match.params.id).then(body => {
      if (body.success) {
        this.setState({ category: body.category, name: body.category.name, isLoading: false });
      } else {
        this.props.toast.error(body.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const categoryService = new CategoryService();
    categoryService.edit(this.props.match.params.id, this.state.name).then(body => {
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

    if (this.state.isLoading) {
      return Loading(this.state.isLoading);
    }
    
    return (
      <div className="container">
        <div className="col-md-6">
          <h1>Create Category</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="name-addon">Name</span>
              <input type="text" name="name" className="form-control" placeholder="Name" aria-describedby="name-addon" onChange={this.handleChange} value={this.state.name} />
            </div>
            <div className="input-group">
              <input type="submit" className="btn btn-warning" value="Edit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditCategory;