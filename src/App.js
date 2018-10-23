import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import axios from 'axios';

import Header from './components/Header';
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
        <Header
          handleKeyPress={this.search.bind(this)}
          hashInput={this.hashInput.bind(this)}
          hash={this.state.hash}
        />
        <Grid container justify="center" className="container">
          {this.state.errmsg && (
            <Grid item>
              <SnackbarContent
                style={{ backgroundColor: red[600] }}
                message={this.state.errmsg}
              />
            </Grid>
          )}
          {this.state.summary &&
            this.state.transactions && (
              <Grid item xs={10}>
                <Summary summary={this.state.summary} />
                <Transactions transactions={this.state.transactions} />
              </Grid>
            )}
        </Grid>
      </div>
    );
  }
}

export default App;
