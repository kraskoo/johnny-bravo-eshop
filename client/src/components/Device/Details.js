import React, { Component } from 'react';
import DeviceService from '../../services/device';

const imageStyle = {
  maxWidth: '350px',
  maxHeight: '350px',
};

class DeviceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { device: null };
  }

  componentDidMount() {
    const deviceService = new DeviceService();
    deviceService.getById(this.props.match.params.id).then(body => {
      if (body.success) {
        this.setState({ device: body.device });
      } else {
        this.props.toast.success(body.message)
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  render() {
    if (!this.state.device) {
      return <div className="container"></div>;
    }

    const device = this.state.device;
    console.log(device);

    return (
      <div className="container">
        <h1>Name: {device.name}</h1>
        <p><h3>Description:</h3> {device.description}</p>
        <h3>Characteristics:</h3>
        <ul>
          {device.characteristics.map((c, i) => (<li key={`${device._id}characteristic${i}`}>{c}</li>))}
        </ul>
        <p>Price: ${device.price}</p>
        <small>Quantity: {device.quantity}</small> <br />
        {device.imageUrls.map((img, i) => (<img src={img} key={`${device._id}image${i}`} style={imageStyle} alt={device.name} />))}
      </div>
    );
  }
}

export default DeviceDetails;