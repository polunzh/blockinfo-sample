import React, { Component } from 'react';
import red from '@material-ui/core/colors/red';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

class Search extends Component {
  render() {
    const { searching, handleKeyPress, hash, hashInput, errmsg } = this.props;

    return (
      <div>
        <Input
          id="search"
          fullWidth={true}
          placeholder="Input block hash here"
          onKeyPress={handleKeyPress}
          onChange={hashInput}
          value={hash}
          startAdornment={
            <InputAdornment position="start">
              {!searching && <SearchIcon />}
              {searching && <CircularProgress color="inherit" size={30} />}
            </InputAdornment>
          }
        />
        {errmsg && (
          <InputLabel htmlFor="search" style={{ color: red[600] }}>
            {errmsg}
          </InputLabel>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  hash: PropTypes.string,
  hashInput: PropTypes.func,
  search: PropTypes.func,
  searching: PropTypes.bool.isRequired,
};

export default Search;
