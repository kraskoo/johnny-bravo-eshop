import React, { Component, Fragment } from 'react';
import DeviceService from '../../services/device';
import Loading from '../Common/Loading';

const imageStyle = {
  maxWidth: '350px',
  maxHeight: '350px',
};

class DeviceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { device: null, isLoading: true };
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

  render() {
    if (this.state.isLoading) {
      return Loading(this.state.isLoading);
    }

    const device = this.state.device;
    return (
      <div className="container">
        <h1>Name: {device.name}</h1>
        <h3>Description:</h3>
        <p>{device.description}</p>
        <h3>Characteristics:</h3>
        <ul>
          {device.characteristics.map((c, i) => (<li key={`${device._id}characteristic${i}`}>{c}</li>))}
        </ul>
        <p>Price: ${device.price}</p>
        {
          this.props.user && this.props.user.roles.includes('Admin') ?
          <Fragment>
            <small>Quantity: {device.quantity}</small> <br />
          </Fragment> :
          null
        }
        {device.imageUrls.map((img, i) => (<img src={img} key={`${device._id}image${i}`} style={imageStyle} alt={device.name} />))}
      </div>
    );
  }
}

export default DeviceDetails;