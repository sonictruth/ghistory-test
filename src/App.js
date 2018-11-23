import React, { Component } from 'react';
import './App.css';
import GenericWorker from './generic.worker';
import { GoogleMap, Marker } from 'react-google-maps';

const locationsDataUrl = './locations.json';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const genericWorker = new GenericWorker();
    genericWorker.postMessage('test');
    this.setState({ isLoading: true });
    fetch(locationsDataUrl)
      .then(response => response.json())
      .then((locations) => this.setState({ locations }))
      .finally(() => this.setState({ isLoading: false }));
  }
  componentDidUpdate() {
    console.log(this.state.locations);
  }
  getLocationList(locations) {
    if (locations.length > 0) {
      const oldestRecord = locations[locations.length - 1];
      const oldestDate = (new Date(oldestRecord.t)).toString();
      return (
        <div>Oldest record: {oldestDate}</div>
      );
    } else {
      return '';
    }
  }
  render() {
    return (<div className="App">
      {this.state.isLoading ? 'Loading...' : `Loaded ${this.state.locations.length} locations.`}
      <div>
        {this.getLocationList(this.state.locations)}
      </div>
    </div>
    );
  }
}

export default App;
