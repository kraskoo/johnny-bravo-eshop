import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { documentHeight: 0 };
    this.setFooterPosition = this.setFooterPosition.bind(this);
    this.updateDimension = this.updateDimension.bind(this);
  }

  setFooterPosition() {
    const footer = document.getElementsByTagName('footer')[0];
    if (this.state.documentHeight < window.screen.height) {
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
    } else {
      footer.style.position = 'inherit';
    }
  }

  updateDimension() {
    this.setState({ documentHeight: document.body.offsetHeight }, this.setFooterPosition);
  }

  componentWillMount() {
    this.updateDimension();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimension);
    document.addEventListener('scroll', this.updateDimension);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
    document.removeEventListener('scroll', this.updateDimension);
  }

  render() {
    setTimeout(this.updateDimension, 555);
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