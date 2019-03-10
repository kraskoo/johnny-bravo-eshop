import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DeviceService from '../../services/device';
import Loading from '../Common/Loading';

class DeleteDevice extends Component {
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
    const deviceService = new DeviceService();
    const id = this.props.match.params.id;
    deviceService.get(id).then(deviceBody => {
      if (deviceBody.success) {
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
      } else {
        this.props.toast.error(deviceBody.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const deviceService = new DeviceService();
    const id = this.props.match.params.id;
    deviceService.delete(id).then(body => {
      if (body.success) {
        this.setState({ hasSubmitted: true });
        this.props.toast.error(body.message);
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
        <div className="col-md-6">
          <h1>Edit Device</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="name-addon">Name</span>
              <input
                type="text"
                name="name"
                className="form-control"
                aria-describedby="name-addon"
                value={this.state.name}
                readOnly />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="description-addon">Description</span>
              <input
                type="text"
                name="description"
                className="form-control"
                aria-describedby="description-addon"
                value={this.state.description}
                readOnly />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="characteristics-addon">Characteristics</span>
              <textarea
                type="text"
                name="characteristics"
                className="form-control"
                aria-describedby="characteristics-addon"
                value={this.state.characteristics} 
                readOnly>
              </textarea>
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="category-addon">Category</span>
              <select name="category" 
                className="form-control"
                aria-describedby="category-addon"
                readOnly>
                {
                  <option value={this.state.category._id}>{this.state.category.name}</option>
                }
              </select>
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="quantity-addon">Quantity</span>
              <input
                type="number"
                name="quantity"
                className="form-control"
                aria-describedby="quantity-addon"
                value={this.state.quantity}
                readOnly />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="price-addon">Price</span>
              <input
                type="number"
                name="price"
                className="form-control"
                aria-describedby="price-addon"
                value={this.state.price}
                readOnly />
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="imageUrls-addon">Image Urls</span>
              <input
                type="text"
                name="imageUrls"
                className="form-control"
                aria-describedby="imageUrls-addon"
                value={this.state.imageUrls}
                readOnly />
            </div>
            <div className="input-group">
              <input type="submit" className="btn btn-danger" value="Delete" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default DeleteDevice;