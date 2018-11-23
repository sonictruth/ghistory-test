import React, { Component } from 'react';
import './App.css';
import GenericWorker from './generic.worker';

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
  render() {
    return (<div className="App">
        {this.state.isLoading ? 'Loading...' : `Loaded ${this.state.locations.length} locations.`}
        {this.state.locations.length > 2 ? new Date(this.state.locations[this.state.locations.length-1].t).toString() : ''  }
      </div>
    );
  }
}

export default App;
