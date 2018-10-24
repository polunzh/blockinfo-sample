import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import axios from 'axios';
import throttle from 'lodash.throttle';

import Header from './components/Header';
import BasicInfo from './components/BasicInfo';
import Transactions from './components/Transactions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hash: '',
      basicInfo: null,
      errmsg: '',
      searching: false,
    };
  }

  resetErrmsg() {
    this.setState({ errmsg: '' });
  }

  async onKeyPress(e) {
    if (e.key !== 'Enter') {
      return false;
    }

    throttle(this.search.bind(this), 1000)();
  }

  async search() {
    if (this.state.searching) {
      return false;
    }

    const hash = this.state.hash.trim();
    if (hash === '') {
      return false;
    }

    this.resetErrmsg();
    this.setState({ searching: true });

    try {
      const hash = this.state.hash.trim();
      if (hash === '') {
        return false;
      }

      const resp = await axios.get(`/rawblock/${this.state.hash}`, {
        headers: { 'Cache-Control': 'no-cache' },
        timeout: 50000,
      });

      const { tx: transactions, ...basicInfo } = resp.data;
      this.setState({ basicInfo });
      this.setState({ transactions });
    } catch (error) {
      console.error(`search error: ${error.message}`);
      if (error.response && error.response.data) {
        this.setState({ errmsg: error.response.data });
      } else {
        this.setState({ errmsg: `Load data failed:${error.message}` });
      }
    } finally {
      this.setState({ searching: false });
    }
  }

  hashInput(e) {
    this.setState({ hash: e.target.value });
  }

  render() {
    return (
      <div>
        <Header
          handleKeyPress={this.onKeyPress.bind(this)}
          hashInput={this.hashInput.bind(this)}
          hash={this.state.hash}
          searching={this.state.searching}
        />
        {!this.state.basicInfo && (
          <Grid container justify="center" className="introduction">
            <Grid item xs={5}>
              <p>
                This is a demo site of{' '}
                <a href="https://www.blockchain.com/">BlockChain</a>, built with{' '}
                <a href="https://reactjs.org/">React.js</a>.
              </p>
              <p>Enter block hash in the search box in the top right corner.</p>
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
        {this.state.basicInfo &&
          this.state.transactions && (
            <Grid container justify="center" className="container">
              <Grid item xs={10}>
                <BasicInfo basicInfo={this.state.basicInfo} />
                <Transactions
                  transactions={this.state.transactions}
                  pageSize={20}
                />
              </Grid>
            </Grid>
          )}
      </div>
    );
  }
}

export default App;
