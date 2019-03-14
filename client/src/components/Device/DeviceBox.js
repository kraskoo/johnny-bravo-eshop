import React from 'react';
import { Link } from 'react-router-dom';

const stockImgStyles = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: '65px',
  height: '65px'
};

function DeviceBox(device, user) {
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
        <img style={stockImgStyles} src={device.quantity > 0 ? '../images/in-stock.png' : '../images/out-of-stock.png'} alt="Stock images" />
        <div className="caption">
          <h3>{slicedName.join('')}</h3>
          <p>{slicedDescription.join('')}</p>
          <p>
            <Link to={`/device/${device._id}`} className="btn btn-primary" role="button">Details</Link>
            {
              device.quantity > 0 ?
                <Link to={`/device/buy/${device._id}`} className="btn btn-success" role="button">Buy</Link> :
                null
            }
          </p>
          {
            user && user.roles.includes('Admin') ?
              <p>
                <Link to={`/device/edit/${device._id}`} className="btn btn-warning" role="button">Edit</Link>
                <Link to={`/device/delete/${device._id}`} className="btn btn-danger" role="button">Delete</Link>
              </p> :
              null
          }
          <p>Category: {device.category.name}</p>
        </div>
      </div>
    </div>
  )
}

export default DeviceBox;