import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DeviceService from '../../services/device';

class AllDevices extends Component {
  constructor(props) {
    super(props);
    this.state = { devices: null };
  }

  componentDidMount() {
    const deviceService = new DeviceService();
    deviceService.getAll().then(body => {
      if (body.success) {
        this.setState({ devices: body.devices })
      } else {
        this.props.toast.error(body.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <h1>All Devices</h1>
        <div class="row">
          {
            this.state.devices && this.state.devices.length > 0 ?
              this.state.devices.map(device => (
                <div class="col-sm-6 col-md-3">
                  <div class="thumbnail">
                    <img src={device.imageUrls[device.imageUrls.length - 1]} alt={device.name} />
                    <div class="caption">
                      <h3>{device.name}</h3>
                      <h5>{device.cat}</h5>
                      <p>{device.description}</p>
                      <p>
                        <a href="#" class="btn btn-primary" role="button">Details</a>
                        <a href="#" class="btn btn-default" role="button">Unknown</a>
                      </p>
                    </div>
                  </div>
                </div>
              )) :
              null
          }
        </div>
      </div>
    );
  }
}

export default AllDevices;