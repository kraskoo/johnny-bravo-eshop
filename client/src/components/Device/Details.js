import React, { Component, Fragment } from 'react';
import DeviceService from '../../services/device';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from '../Common/Loading';

const imageStyle = { maxWidth: '400px' };
const rightAlign = { textAlign: 'right' };
const italic = { fontStyle: 'italic' };

const CarouselImages = (device) => (
  <div className="col-md-8 col-centered">
    <Carousel showIndicators={false} showStatus={false} autoPlay={true} emulateTouch={true} infiniteLoop={true}>
      {device.imageUrls.map((img, i) => (
        <div key={`${device._id}image${i}`}>
          <img src={img} style={imageStyle} alt={device.name} />
        </div>
      ))}
    </Carousel>
  </div>
);

const Characteristics = (device) => (
  device.characteristics.map((c, i) => (<li key={`${device._id}characteristic${i}`}>{c}</li>))
);

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
      <div id="main" className="container">
        <h1>{device.name}</h1>
        <p style={italic}>{device.description}</p>
        <h4 style={rightAlign} className="text-info">Price: ${device.price}</h4>
        {
          this.props.user && this.props.user.roles.includes('Admin') ?
          <Fragment>
            <p style={rightAlign} className="text-primary">Quantity: {device.quantity}</p>
          </Fragment> :
          null
        }
        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#images">Images</a></li>
          <li><a data-toggle="tab" href="#characteristics">Characteristics</a></li>
        </ul>
        <div className="tab-content">
          <div id="images" className="tab-pane fade in active">
            {CarouselImages(device)}
          </div>
          <div id="characteristics" className="tab-pane fade">
            <div className="col-md-8">
              <br />
              <ul>{Characteristics(device)}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceDetails;