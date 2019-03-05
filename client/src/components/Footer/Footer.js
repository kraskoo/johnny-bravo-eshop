import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.setFooterPosition = this.setFooterPosition.bind(this);
  }

  setFooterPosition() {
    const body = document.body;
    const footer = document.getElementsByTagName('footer')[0];
    if (body.offsetHeight < window.screen.height) {
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
    } else {
      footer.style.position = 'inherit';
    }
  }

  componentDidUpdate() {
    this.setFooterPosition();
  }

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">&copy; {new Date().getFullYear()} Johnny Bravo Eshop</p>
        </div>
      </footer>
    );
  }
}

export default Footer;