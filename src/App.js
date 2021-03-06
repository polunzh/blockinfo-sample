import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import throttle from 'lodash.throttle';

import constant from './constant';
import Header from './components/Header';
import Search from './components/Search';
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
      pagination: {
        pageSize: constant.PAGE_SIZE,
        pageIndex: 0,
      },
      transactions: [],
      currentTransactions: [],
      totalTransactionLength: 0,
    };
  }

  resetErrmsg() {
    this.setState({ errmsg: '' });
  }

  verifyHash(hash) {
    return /[a-zA-Z0-9]{64}/.test(hash);
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
    if (!this.verifyHash(hash)) {
      this.setState({ errmsg: 'Invalid block hash' });
      return false;
    }

    try {
      this.resetPagination();
      this.resetErrmsg();
      this.setState({ searching: true });

      const resp = await axios.get(`/rawblock/${this.state.hash}`, {
        headers: { 'Cache-Control': 'no-cache' },
        timeout: 20000,
      });

      const { tx: transactions, ...basicInfo } = resp.data;
      this.setState({
        basicInfo,
        transactions,
        totalTransactionLength: transactions.length,
      });
      this.paginateTransactions();
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

  resetPagination() {
    const pagination = this.state.pagination;
    pagination.pageIndex = 0;

    this.setState({ pagination });
  }

  paginateTransactions() {
    const pagination = this.state.pagination;
    const currentTransactions = this.state.transactions.slice(
      0,
      (pagination.pageIndex + 1) * pagination.pageSize
    );

    pagination.pageIndex++;
    this.setState({
      pagination,
      currentTransactions,
    });
  }

  hashInput(e) {
    this.setState({ hash: e.target.value });
  }

  render() {
    const {
      hash,
      searching,
      errmsg,
      currentTransactions,
      totalTransactionLength,
    } = this.state;

    return (
      <div>
        <Header />
        <Grid container justify="center" className="introduction">
          <Grid item xs={6}>
            <Search
              handleKeyPress={this.onKeyPress.bind(this)}
              hashInput={this.hashInput.bind(this)}
              hash={hash}
              searching={searching}
              errmsg={errmsg}
            />
            <div className="sample-hash">
              Block hash samples:
              <ul>
                <li>
                  000000000000000001f942eb4bfa0aeccb6a14c268f4c72d5fff17270da771b9
                </li>
                <li>
                  000000000845517b31c6820d83f25cff46429bf136a7515fe504116427e60f8e
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
        {this.state.basicInfo &&
          this.state.transactions && (
            <Grid
              id="container"
              container
              justify="center"
              className="container"
            >
              <Grid item xs={10}>
                <BasicInfo basicInfo={this.state.basicInfo} />
                <Transactions
                  transactions={currentTransactions}
                  totalTransactionLength={totalTransactionLength}
                  paginate={this.paginateTransactions.bind(this)}
                />
              </Grid>
            </Grid>
          )}
      </div>
    );
  }
}

export default App;
