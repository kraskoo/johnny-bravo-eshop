import React, { Component } from 'react';

function withConsumer(WrappedComponent, Consumer) {
  return class WithConsumer extends Component {
    render() {
      return (
        <Consumer>
          {
            (value) => (<WrappedComponent {...value} {...this.props} />)
          }
        </Consumer>
      );
    }
  }
}

export default withConsumer;