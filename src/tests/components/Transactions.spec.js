import TestRenderer from 'react-test-renderer';
import React from 'react';
import Transactions from '../../components/Transactions';
import constant from '../../constant';
import { mockedTransactions } from '../mock-data';
import { mount } from 'enzyme';

describe('#Component Transactions', () => {
  test('#pageSize should be the prop value', () => {
    const testTransactions = TestRenderer.create(
      <Transactions pageSize={30} transactions={[]} />
    );

    expect(testTransactions.getInstance().state.pagination.pageSize).toBe(30);
  });

  test('#pageSize should be the default value is prop value is undefined', () => {
    const testTransactions = TestRenderer.create(
      <Transactions transactions={[]} />
    );

    expect(testTransactions.getInstance().state.pagination.pageSize).toBe(
      constant.PAGE_SIZE
    );
  });

  test('#Load more button should be show when data size is large than page size', () => {
    const testTransactions = mount(
      <Transactions
        pageSize={mockedTransactions.length - 1}
        transactions={mockedTransactions}
      />
    );

    expect(testTransactions.find('.pagination').length).toBe(1);
  });

  test('#"Load more" button should not be show when data size is small than page size', () => {
    const testTransactions = mount(
      <Transactions
        pageSize={mockedTransactions.length + 1}
        transactions={mockedTransactions}
      />
    );

    expect(testTransactions.find('.pagination').length).toBe(0);
  });
});
