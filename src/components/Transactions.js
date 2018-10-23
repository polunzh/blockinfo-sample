import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageArrowRight from '../img/arrow_right_green.png';
import constant from '../constant';

class Transactions extends Component {
  constructor() {
    super();

    this.state = {
      hasMore: false,
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
      transactions: [],
    };
  }

  groupByAddress(transactions) {
    const result = {};
    transactions.forEach(item => {
      if (!result[item.addr]) {
        result[item.addr] = item.value;
      } else {
        result[item.addr] += item.value;
      }

      return item;
    }, {});

    return result;
  }

  formatValue(value) {
    return value / 100000000;
  }

  rendInputs(inputs) {
    let hasInputs = false;
    const inputsDOM = (
      <div>
        {inputs.map((input, inputIdx) => {
          if (!input.prev_out) {
            return '';
          }

          hasInputs = !!input.prev_out.addr;
          return (
            <div key={input + inputIdx}>
              <a href="http://#">{input.prev_out.addr}</a>
              <br />
            </div>
          );
        })}
      </div>
    );

    if (hasInputs) {
      return inputsDOM;
    }

    return 'No Inputs (Newly Generated Coins)';
  }

  paginate() {
    const pagination = this.state.pagination;

    const transactions = this.props.transactions.slice(
      0,
      (pagination.pageIndex + 1) * pagination.pageSize
    );

    pagination.pageIndex++;
    this.setState({
      pagination,
      transactions,
      hasMore: transactions.length < this.props.transactions.length,
    });
  }

  componentDidMount() {
    this.paginate();
  }

  render() {
    const { transactions } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <h1>Transactions</h1>
        </Grid>
        {transactions && (
          <Grid item xs={12}>
            {transactions.map((tx, idx) => {
              const outMap = this.groupByAddress(tx.out);
              let totalOutput = 0;
              tx.out.forEach(out => {
                totalOutput += out.value;
              });

              return (
                <Table className="strip-table" key={'tx' + idx}>
                  <TableBody>
                    <TableRow key={'tx-detail' + idx}>
                      <TableCell component="th" scope="row" colSpan={2}>
                        <a href="https://www.baidu.com">{tx.hash}</a>
                      </TableCell>
                      <TableCell component="th" scope="row" />
                      <TableCell component="th" scope="row" numeric={true}>
                        {moment(tx.time * 1000).format(
                          constant.DATETIME_FORMAT
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow key={idx + Date.now()}>
                      <TableCell component="th" scope="row">
                        {this.rendInputs(tx.inputs)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <img
                          className="tx-arrow-col"
                          src={ImageArrowRight}
                          alt="→"
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {Object.keys(outMap).map((addr, addrIdx) => {
                          return (
                            <div key={addr + addrIdx}>
                              <a href="http://#">{addr}</a>
                              <br />
                            </div>
                          );
                        })}
                      </TableCell>
                      <TableCell component="th" scope="row" numeric={true}>
                        {Object.values(outMap).map((value, valueIdx) => {
                          return (
                            <div key={value + valueIdx}>
                              {this.formatValue(value)} BTC
                              <br />
                            </div>
                          );
                        })}
                        <Button variant="contained" color="primary">
                          {this.formatValue(totalOutput)} BTC
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              );
            })}
            {this.state.hasMore && (
              <div className="pagination">
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10} />
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: blue[500] }}
                        onClick={this.paginate.bind(this)}
                      >
                        Load More
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}

Transactions.propTypes = {
  transactions: PropTypes.array,
};

export default Transactions;
