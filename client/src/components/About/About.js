import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About</h1>
        <h3>
          This project is built by project assignment from the course <a href="https://softuni.bg/trainings/2282/reactjs-fundamentals-february-2019" target="_blank">ReactJS Fundamentals</a> at <a href="https://softuni.bg/">SoftUni</a>
        </h3>
        <br />
        <h4>This project is built with no-commercial purpose</h4>
      </div>
    );
  }
}