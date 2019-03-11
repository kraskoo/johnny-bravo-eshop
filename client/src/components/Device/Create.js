import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CategoryService from '../../services/category';
import DeviceService from '../../services/device';

class CreateDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      characteristics: '',
      category: '',
      quantity: '',
      price: '',
      imageUrls: '',
      categories: null,
      hasSubmitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const categoryService = new CategoryService();
    categoryService.getAll().then(body => {
      if (body.success) {
        if (body.categories.length > 0) {
          this.setState({ category: body.categories[0]._id });
        }

        this.setState({ categories: body.categories });
      } else {
        this.props.toast.error(body.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const bodyToSend = {
      name: this.state.name,
      description: this.state.description,
      characteristics: this.state.characteristics.split(/\r?\n/g),
      category: this.state.category,
      quantity: this.state.quantity,
      price: this.state.price,
      imageUrls: this.state.imageUrls.split(', '),
    };
    const deviceService = new DeviceService();
    deviceService.create(bodyToSend).then(body => {
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
        <div className="col-md-5 col-centered">
          <h1>Create Device</h1>
          <div className="well">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  id="description"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="characteristics">Characteristics</label>
                <textarea
                  type="text"
                  name="characteristics"
                  className="form-control"
                  placeholder="Characteristics separated by new line"
                  id="characteristics"
                  onChange={this.handleChange}>
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" 
                  className="form-control"
                  id="category"
                  onChange={this.handleChange}>
                  {
                    this.state.categories ?
                      this.state.categories.map(category => (<option value={category._id} key={category._id}>{category.name}</option>)) :
                      null
                  }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  min="0"
                  max="1000"
                  placeholder="Quantity"
                  id="quantity"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  min="1"
                  max="500000"
                  placeholder="Price"
                  id="price"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrls">Image Urls</label>
                <input
                  type="text"
                  name="imageUrls"
                  className="form-control"
                  min="1"
                  max="500000"
                  placeholder="Image Urls separated by comma and space"
                  id="imageUrls"
                  onChange={this.handleChange} />
              </div>
              <button type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateDevice;