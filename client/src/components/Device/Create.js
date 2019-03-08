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
      hasFetched: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        this.setState({ hasFetched: true });
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

  render() {
    if ((!this.props.user || (this.props.user && !this.props.user.roles.includes('Admin'))) || this.state.hasSubmitted) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="col-md-6">
          <h1>Create Device</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="name-addon">Name</span>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                aria-describedby="name-addon"
                onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="description-addon">Description</span>
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Description"
                aria-describedby="description-addon"
                onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="characteristics-addon">Characteristics</span>
              <textarea
                type="text"
                name="characteristics"
                className="form-control"
                placeholder="Characteristics separated by new line"
                aria-describedby="characteristics-addon"
                onChange={this.handleChange}>
              </textarea>
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="category-addon">Category</span>
              <select name="category" 
                className="form-control"
                aria-describedby="category-addon"
                onChange={this.handleChange}>
                {
                  this.state.categories ?
                    this.state.categories.map(category => (<option value={category._id} key={category._id}>{category.name}</option>)) :
                    null
                }
              </select>
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="quantity-addon">Quantity</span>
              <input
                type="number"
                name="quantity"
                className="form-control"
                min="0"
                max="1000"
                placeholder="Quantity"
                aria-describedby="quantity-addon"
                onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="price-addon">Price</span>
              <input
                type="number"
                name="price"
                className="form-control"
                min="1"
                max="500000"
                placeholder="Price"
                aria-describedby="price-addon"
                onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="imageUrls-addon">Image Urls</span>
              <input
                type="text"
                name="imageUrls"
                className="form-control"
                min="1"
                max="500000"
                placeholder="Image Urls separated by comma and space"
                aria-describedby="imageUrls-addon"
                onChange={this.handleChange} />
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

export default CreateDevice;