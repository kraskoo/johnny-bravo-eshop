import React, { Component } from 'react';
import DeviceBox from './DeviceBox';
import DeviceService from '../../services/device';
import Loading from '../Common/Loading';
import './All.css';

class AllDevices extends Component {
  constructor(props) {
    super(props);
    this.state = { devices: null, isLoading: true };
  }

  componentDidMount() {
    const deviceService = new DeviceService();
    deviceService.getAll().then(body => {
      if (body.success) {
        body.devices = body.devices.sort((a, b) => {
          const categoryNameComparer = a.category.name.localeCompare(b.category.name);
          if (categoryNameComparer === 0) return a.name.localeCompare(b.name);
          else return categoryNameComparer;
        });
        this.setState({ devices: body.devices, isLoading: false });
      } else {
        this.props.toast.error(body.message);
      }
    }).catch(error => {
      this.props.toast.error(error.message);
    });
  }

  render() {
    if (this.state.isLoading) {
      return Loading(this.state.isLoading);
    }

    return (
      <div id="main" className="container">
        <h1>All Devices</h1>
        <div className="row">
          {
            this.state.devices.map(device => DeviceBox(device, this.props.user, this.props.match.path))
          }
        </div>
      </div>
    );
  }
}

export default AllDevices;