import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import ArrowForward from '@material-ui/icons/ArrowForward';

class Transactions extends Component {
  render() {
    return (
      <Grid item xs={8}>
        <h1>Transactions</h1>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12}>
            <Table>
              <TableBody>
                <TableRow key="summary">
                  <TableCell component="th" scope="row" colSpan={2}>
                    {/* <link href="#"> */}
                      {/* 9a223b09449cdd383206db29fe7f5ea31e0154d9fb30eabafe36eb8a9a33d22f */}
                    {/* </link> */}
                  </TableCell>
                  <TableCell component="th" scope="row" />
                  <TableCell component="th" scope="row">
                    2018-10-21 12:40:42
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Number of Transactions
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ArrowForward />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Number of Transactions
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Date.now()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Transactions;
