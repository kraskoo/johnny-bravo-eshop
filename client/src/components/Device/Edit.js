import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CategoryService from '../../services/category';
import DeviceService from '../../services/device';
import Loading from '../Common/Loading';

class EditDevice extends Component {
  _isMounted = false;
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
      hasSubmitted: false,
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const deviceService = new DeviceService();
    const categoryService = new CategoryService();
    const id = this.props.match.params.id;
    categoryService.getAll().then(categoryBody => {
      if (categoryBody.success) {
        if (this._isMounted) {
          this.setState({ categories: categoryBody.categories }, function() {
            deviceService.get(id).then(deviceBody => {
              if (deviceBody.success) {
                if (this._isMounted) {
                  this.setState({
                    name: deviceBody.device.name,
                    description: deviceBody.device.description,
                    characteristics: deviceBody.device.characteristics.join('\n'),
                    category: deviceBody.device.category,
                    quantity: deviceBody.device.quantity,
                    price: deviceBody.device.price,
                    imageUrls: deviceBody.device.imageUrls.join(', '),
                    isLoading: false
                  });
                }
              } else {
                this.props.toast.error(deviceBody.message);
              }
            }).catch(error => {
              this.props.toast.error(error.message);
            });
          });
        }
      } else {
        this.props.toast.error(categoryBody.message);
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
    const id = this.props.match.params.id;
    deviceService.edit(id, bodyToSend).then(body => {
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
      <div id="main" className="container">
        <div className="col-md-5 col-centered">
          <h1>Edit Device</h1>
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
                  onChange={this.handleChange}
                  value={this.state.name} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  id="description"
                  onChange={this.handleChange}
                  value={this.state.description} />
              </div>
              <div className="form-group">
                <label htmlFor="characteristics">Characteristics</label>
                <textarea
                  type="text"
                  name="characteristics"
                  className="form-control"
                  placeholder="Characteristics separated by new line"
                  id="characteristics"
                  onChange={this.handleChange}
                  value={this.state.characteristics}>
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" 
                  className="form-control"
                  id="category"
                  onChange={this.handleChange}
                  defaultValue={this.state.category._id}>
                  {
                    this.state.categories ?
                      this.state.categories.map(category =>
                        (<option value={category._id} key={category._id}>{category.name}</option>)) :
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
                  onChange={this.handleChange}
                  value={this.state.quantity} />
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
                  onChange={this.handleChange}
                  value={this.state.price} />
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
                  onChange={this.handleChange}
                  value={this.state.imageUrls} />
              </div>
              <button type="submit" className="btn btn-warning">Edit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDevice;