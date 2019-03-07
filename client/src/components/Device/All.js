import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DeviceService from '../../services/device';
import './All.css';

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
        <div className="row">
          {
            this.state.devices && this.state.devices.length > 0 ?
              this.state.devices.map(device => {
                const nameLength = 30;
                let slicedName = device.name.split('').slice(0, nameLength);
                if (device.name.length > nameLength) {
                  slicedName.push('...');
                }

                const descriptionLength = 80;
                let slicedDescription = device.description.split('').slice(0, descriptionLength);
                if (device.description.length > descriptionLength) {
                  slicedDescription.push('...');
                }

                return (
                  <div className="col-sm-6 col-md-3">
                    <div className="thumbnail">
                      <img src={device.imageUrls[0]} alt={device.name} />
                      <div className="caption">
                        <h3>{slicedName.join('')}</h3>
                        <p>{slicedDescription.join('')}</p>
                        <p>
                          <a href="#" className="btn btn-primary" role="button">Details</a>
                          <a href="#" className="btn btn-default" role="button">Unknown</a>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              }) :
              <h3 className="text-center">Sorry, no devices to show.</h3>
          }
        </div>
      </div>
    );
  }
}

export default AllDevices;