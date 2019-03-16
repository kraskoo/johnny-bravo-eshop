import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div id="main" className="container">
        <h1>About</h1>
        <h3>
          This project is built by project assignment from the course <a href="https://softuni.bg/trainings/2282/reactjs-fundamentals-february-2019" rel="noopener noreferrer" target="_blank">ReactJS Fundamentals</a> at <a href="https://softuni.bg/" rel="noopener noreferrer" target="_blank">SoftUni</a>
        </h3>
        <br />
        <h4>This project is built with non-commercial purpose</h4>
      </div>
    );
  }
}