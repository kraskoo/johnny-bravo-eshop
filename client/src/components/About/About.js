import React, { Component } from 'react';

const mapsStyles = { width: '600px', height: '600px' };
const smallStyles = { fontVariant: 'small-caps', display: 'block' };

export default class About extends Component {
  componentDidMount() {
    const googleapis = document.createElement("script");
    googleapis.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBGPS9JJv91loXVGYGYl1AthZVwrOFuilU&language=bg&region=BG&callback=initMap';
    googleapis.async = true;
    googleapis.defer = true;
    document.body.appendChild(googleapis);
    const script = document.createElement("script");
    script.src = "./js/googlemaps.js";
    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="container">
        <h1>About</h1>
        <h3>
          This project is built by project assignment from the course <a href="https://softuni.bg/trainings/2282/reactjs-fundamentals-february-2019" rel="noopener noreferrer" target="_blank">ReactJS Fundamentals</a> at <a href="https://softuni.bg/" rel="noopener noreferrer" target="_blank">SoftUni</a>
        </h3>
        <br />
        <h4>This project is built with non-commercial purpose</h4>
        <br />
        <h4 className="text-center">This map is just for demo!</h4>
        <small className="text-center" style={smallStyles}>Probably it won't work correctly, this could be because of new billing system</small>
        <br />
        <div id="map" className="col-centered" style={mapsStyles}></div>
      </div>
    );
  }
}