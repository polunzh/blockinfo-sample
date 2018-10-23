import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import Summary from './components/Summary';
import Transactions from './components/Transactions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hash: '000000000000000001806a922d4d35a37ad9324c690f72d556c6445cb7a9c214',
      summary: null,
      errmsg: '',
    };
  }

  resetErrmsg() {
    this.setState({ errmsg: '' });
  }

  async search(e) {
    if (e.key !== 'Enter') {
      return false;
    }

    this.resetErrmsg();
    const hash = this.state.hash.trim();
    if (hash === '') {
      return false;
    }

    try {
      const hash = this.state.hash.trim();
      if (hash === '') {
        return false;
      }

      const resp = await axios.get(`/rawblock/${this.state.hash}`, {
        headers: { 'Cache-Control': 'no-cache' },
      });

      const { tx: transactions, ...summary } = resp.data;
      this.setState({ summary });
      this.setState({ transactions });
    } catch (error) {
      console.error(`search error: ${error.message}`);
      this.setState({ errmsg: 'Load data failed!' });
    }
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
        {!this.state.summary && (
          <Grid container justify="center" className="introduction">
            <Grid item xs={5}>
              <p>
                This is a demo site of{' '}
                <a href="https://www.blockchain.com/">BlockChain</a>, built with{' '}
                <a href="https://reactjs.org/">React.js</a>
              </p>
            </Grid>
          </Grid>
        )}
        {this.state.errmsg && (
          <Grid container justify="center">
            <Grid item>
              <SnackbarContent
                style={{ backgroundColor: red[600] }}
                message={this.state.errmsg}
              />
            </Grid>
          </Grid>
        )}
        {this.state.summary &&
          this.state.transactions && (
            <Grid container justify="center" className="container">
              <Grid item xs={10}>
                <Summary summary={this.state.summary} />
                <Transactions transactions={this.state.transactions} />
              </Grid>
            </Grid>
          )}
      </div>
    );
  }
}

export default App;
