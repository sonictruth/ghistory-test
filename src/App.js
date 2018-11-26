import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

const locationsDataUrl = './locations.json';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      currentIndex: 0,
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(locationsDataUrl)
      .then(response => response.json())
      .then((locations) => {
        this.setState({
          locations,
          isLoading: false
        });
        this.startTimer();
      }
      )
      .catch(() => this.setState({ isLoading: false }));
  }

  startTimer() {
    let state;
    const time = 100;
    const speed = 20;
    if (this.state.currentIndex <= 0) {
      state = { currentIndex: this.state.locations.length -1 };
    } else {
      state = { currentIndex: this.state.currentIndex - speed };
    }

    this.setState(state);
    setTimeout(() => this.startTimer(), time);
  }
  getCurrentView() {
    const locations = this.state.locations;
    if (locations.length > 0) {

      const currentLocation = locations[this.state.currentIndex];

      return (
        <div>
          <div>{this.formatTimestamp(currentLocation.t)}</div>
          <div>{this.getMap(this.convertE7Coordinates(currentLocation.l))}</div>
        </div>
      );
    }
  }
  formatTimestamp(timestamp) {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp)
  }
  convertE7Coordinates(position) {
    return [position[1] / 10 ** 7, position[0] / 10 ** 7];
  }
  getMap(position) {
    const mapStyle = { width: '100%', margin: 'auto', height: '600px' };
    const zoom = 12;

    return (
      <Map center={position} zoom={zoom} style={mapStyle}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Last location.
          </Popup>
        </Marker>
      </Map>
    );
  }
  render() {
    return (<div className="App">
      {this.state.isLoading ? 'Loading...' : `${this.state.locations.length} locations.`}
      <div>
        {this.getCurrentView(this.state.locations)}
      </div>
    </div>
    );
  }
}

export default App;
