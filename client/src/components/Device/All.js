import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import DeviceService from '../../services/device';
import Loading from '../Common/Loading';
import './All.css';

function DeviceBox(device) {
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
    <div className="col-sm-6 col-md-3" key={device._id}>
      <div className="thumbnail">
        <img src={device.imageUrls[0]} alt={device.name} />
        <div className="caption">
          <h3>{slicedName.join('')}</h3>
          <p>{slicedDescription.join('')}</p>
          <p>
            <Link to={`/device/${device._id}`} className="btn btn-primary" role="button">Details</Link>
            <a href="#" className="btn btn-default" role="button">Unknown</a>
          </p>
        </div>
      </div>
    </div>
  )
}

class AllDevices extends Component {
  constructor(props) {
    super(props);
    this.state = { devices: null, isLoading: true };
  }

  componentDidMount() {
    const deviceService = new DeviceService();
    deviceService.getAll().then(body => {
      if (body.success) {
        this.setState({ devices: body.devices, isLoading: false });
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
            !this.state.isLoading ?
              this.state.devices.map(DeviceBox) :
              Loading(this.state.isLoading)
          }
        </div>
      </div>
    );
  }
}

export default AllDevices;