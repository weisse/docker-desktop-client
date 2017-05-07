import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class IndeterministicLoader extends Component {

  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    var self = this;
    this.timeout = setTimeout(function () {
      self.setState({ show: true });
    }, this.props.delay || 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    if (!this.state.show) {
      return <div />;
    }
    return (
      <div style={{ textAlign: "center" }}>
        {this.props.title || null}
        <CircularProgress
          size={this.props.size || 80}
          thickness={this.props.thickness || 5}
          style={{ display: "block", margin: "0 auto" }}
        />
      </div>
    );
  }
};