import React, { Component } from 'react';
import './App.css';
import pako from 'pako';

const dataUrl = 'data.txt';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      isLoading: false
    };
  }
  decompressResponse(response) {
    pako.inflate(window.atob(response), { to: 'string' })
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(dataUrl)
      .then(response => response.text())
      .then(this.decompressResponse)
      .catch(() => this.setState({ isLoading: false }));
  }
  componentDidUpdate() {
    this.state.locations.filter(location => location.latitudeE7 === 1);
  }
  render() {
    return (
      <div className="App">
        {this.state.isLoading ? 'Loading...' : `Loaded ${this.state.locations.length} locations.`}
      </div>
    );
  }
}

export default App;
