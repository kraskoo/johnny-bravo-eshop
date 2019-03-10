import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import CategoryService from '../../services/category';
import Loading from '../Common/Loading';

class AllCategories extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: null, isLoading: true };
  }

  componentDidMount() {
    const categoryService = new CategoryService();
    if (this.props.user) {
      categoryService.getAll().then(body => {
      if (body.success) {
        this.setState({ tags: body.categories, isLoading: false });
      } else {
        this.props.toast.error(body.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
    }
  }

  render() {
    if (!this.props.user || (this.props.user && !this.props.user.roles.includes('Admin'))) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="col-md-6">
          <h1>All tags</h1>
          <table className="table table-hover">
            <tbody>
            {
              !this.state.isLoading ?
                this.state.tags.map(category => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td><Link to={`/category/edit/${category._id}`} role="button" className="btn btn-warning">Edit</Link></td>
                    <td><Link to={`/category/delete/${category._id}`} role="button" className="btn btn-danger">Delete</Link></td>
                  </tr>
                )) :
                <tr><td>{Loading(this.state.isLoading)}</td></tr>
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllCategories;