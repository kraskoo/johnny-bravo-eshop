import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DeviceService from '../../services/device';
import Loading from '../Common/Loading';

const imgStyles = { maxWidth: '300px' };

class BuyDevices extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { device: null, count: 0, isLoading: true, hasSubmitted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const deviceService = new DeviceService();
    deviceService.get(this.props.match.params.id).then(body => {
      if (body.success) {
        if (this._isMounted) {
          this.setState({ device: body.device, isLoading: false });
        }
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const deviceService = new DeviceService();
    if (this.state.count === 0) {
      this.props.toast.error('You cannot buy 0 devices');
      return;
    }

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

    if (this.state.hasSubmitted) {
      return <Redirect to="/" />;
    }

    const device = this.state.device;
    return (
      <div className="container">
        <div className="col-md-7 col-centered">
          <h1>Name: {device.name}</h1>
          <img src={device.imageUrls[0]} alt={device.name} style={imgStyles} />
          {
            device.imageUrls.length > 1 ?
              <img src={device.imageUrls[1]} alt={device.name} style={imgStyles} /> :
              null
          }
          <p>Price: ${device.price}</p>
          <div className="well">
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="count" className="right-space-25">Count</label>
                <input
                  type="number"
                  name="count"
                  className="form-control right-space-25 width-450"
                  placeholder="Count"
                  min="1"
                  max={device.quantity}
                  id="count"
                  onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Buy</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyDevices;