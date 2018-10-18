import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { hash: '' };
  }
  async loadData() {
    const resp = await axios.get(`/block/${this.state.hash}.json`);

    console.log(resp.data);
  }

  hashInput(e) {
    this.setState({ hash: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <div>
          Hash{' '}
          <input
            type="text"
            value={this.state.hash}
            onChange={this.hashInput.bind(this)}
          />
          <button onClick={this.loadData.bind(this)}>Confirm</button>
        </div>
      </div>
    );
  }
}

export default App;
