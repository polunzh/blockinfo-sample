import TestRenderer from 'react-test-renderer';
import React from 'react';
import Search from '../../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

describe('#Component Header', () => {
  test('#CircularProgress should display when searching is true', () => {
    expect(TestRenderer.create(<Search searching={true} />).root.findByType(
      CircularProgress
    ).type.displayName).toContain('CircularProgress');
  });

  test('#SearchIcon should display when searching is false', () => {
    expect(
      TestRenderer.create(<Search searching={false} />).root.findByType(
        SearchIcon
      ).type.displayName
    ).toContain('SearchIcon');
  });
});
