import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';
import moment from 'moment';

class Summary extends Component {
  render() {
    const { summary } = this.props;

    return (
      <Grid container>
        {summary && (
          <Grid item xs={12}>
            <h1>Block #{summary.height}</h1>
          </Grid>
        )}
        {summary && (
          <Grid container spacing={8} justify="center">
            <Grid item xs={6}>
              <Table className="strip-table">
                <TableBody>
                  <TableRow key="summary">
                    <TableCell component="th" scope="row" colSpan={2}>
                      Summary
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Number of Transactions
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.n_tx}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Transaction Fees
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.fee * 0.00000001} BTC
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Height
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <a
                        href={
                          'https://www.blockchain.com/btc/block-height/' +
                          summary.height
                        }
                      >
                        {summary.height}
                      </a>
                      {summary.main_chain && (
                        <font color="green"> (Main Chain)</font>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Size
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.size}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Bits
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.bits}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Nonce
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.nonce}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Timestamp
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {moment(summary.time * 1000).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={6}>
              <Table className="strip-table">
                <TableBody>
                  <TableRow key="summary">
                    <TableCell component="th" scope="row" colSpan={2}>
                      Hashes
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Hash
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.hash}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Previous Block
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.prev_block}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Next Block(s)
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.next_block}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Merkle Root
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {summary.mrkl_root}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

Summary.propTypes = {
  summary: PropTypes.object.isRequired,
};

export default Summary;
