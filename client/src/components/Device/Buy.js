import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DeviceService from '../../services/device';
import Loading from '../Common/Loading';

const imgStyles = { maxWidth: '200px' };

class BuyDevices extends Component {
  constructor(props) {
    super(props);
    this.state = { device: null, count: 0, isLoading: true, hasSubmitted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const deviceService = new DeviceService();
    deviceService.get(this.props.match.params.id).then(body => {
      if (body.success) {
        this.setState({ device: body.device, isLoading: false });
      } else {
        this.props.toast.success(body.message)
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const deviceService = new DeviceService();
    deviceService.buy(this.props.match.params.id, this.state.count).then(body => {
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
    if (!this.props.user) {
      return <Redirect to="/user/login" />;
    }

    if (this.state.isLoading) {
      return Loading(this.state.isLoading);
    }

    if (this.state.device.quantity === 0) {
      this.props.toast.error('Not enough devices in the store');
      return <Redirect to="/device/all" />;
    }

    if (this.state.hasSubmitted) {
      return <Redirect to="/" />;
    }

    const device = this.state.device;
    return (
      <div className="container">
        <h1>Name: {device.name}</h1>
        <img src={device.imageUrls[0]} alt={device.name} style={imgStyles} />
        <p>Price: ${device.price}</p>
        <div className="col-md-3">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon" id="count-addon">Count</span>
              <input
                type="number"
                name="count"
                className="form-control"
                placeholder="Count"
                min="1"
                max={device.quantity}
                aria-describedby="count-addon"
                onChange={this.handleChange} />
            </div>
            <div className="input-group">
              <input type="submit" className="btn btn-success" value="Buy" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default BuyDevices;