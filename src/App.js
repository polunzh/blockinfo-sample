import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import Summary from './components/Summary';
import Transactions from './components/Transactions';

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      hash: '000000000000000001806a922d4d35a37ad9324c690f72d556c6445cb7a9c214',
      summary: {},
    };
  }

  async search(e) {
    if (e.key !== 'Enter') {
      return false;
    }

    const hash = this.state.hash.trim();
    if (hash === '') {
      return false;
    }

    const resp = await axios.get(`/rawblock/${this.state.hash}`, {
      headers: { 'Cache-Control': 'no-cache' },
    });

    this.setState({ summary: resp.data });
    this.setState({ transactions: resp.data.tx });
  }

  hashInput(e) {
    this.setState({ hash: e.target.value });
  }

  render() {
    return (
      <div>
        <SearchBar
          handleKeyPress={this.search.bind(this)}
          hashInput={this.hashInput.bind(this)}
          hash={this.state.hash}
        />
        <div className={styles.root} />
        <Grid container spacing={16} justify="center">
          <Grid item xs={8}>
            <Summary summary={this.state.summary} />
            <Transactions transactions={this.state.transactions} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
