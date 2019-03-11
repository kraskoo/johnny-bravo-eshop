import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DeviceService from '../../services/device';
import Loading from '../Common/Loading';

class DeleteDevice extends Component {
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
      hasSubmitted: false,
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const deviceService = new DeviceService();
    const id = this.props.match.params.id;
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
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const deviceService = new DeviceService();
    const id = this.props.match.params.id;
    deviceService.delete(id).then(body => {
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
          <h1>Delete Device</h1>
          <div className="well">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={this.state.name}
                  disabled />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  id="description"
                  value={this.state.description}
                  disabled />
              </div>
              <div className="form-group">
                <label htmlFor="characteristics">Characteristics</label>
                <textarea
                  type="text"
                  name="characteristics"
                  className="form-control"
                  id="characteristics"
                  value={this.state.characteristics} 
                  disabled>
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" 
                  className="form-control"
                  id="category"
                  disabled>
                  {
                    <option value={this.state.category._id}>{this.state.category.name}</option>
                  }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  id="quantity"
                  value={this.state.quantity}
                  disabled />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  id="price"
                  value={this.state.price}
                  disabled />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrls">Image Urls</label>
                <input
                  type="text"
                  name="imageUrls"
                  className="form-control"
                  id="imageUrls"
                  value={this.state.imageUrls}
                  disabled />
              </div>
              <button type="submit" className="btn btn-danger">Delete</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteDevice;