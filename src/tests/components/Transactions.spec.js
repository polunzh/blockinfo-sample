import React from 'react';
import Transactions from '../../components/Transactions';
import { mockedTransactions } from '../mock-data';
import { mount } from 'enzyme';

describe('#Component Transactions', () => {
  test('#Load more button should be show when data size is large than page size', () => {
    const testTransactions = mount(
      <Transactions
        transactions={mockedTransactions}
        totalTransactionLength={mockedTransactions.length + 1}
      />
    );

    expect(testTransactions.find('.pagination').length).toBe(1);
  });

  test('#"Load more" button should not be show when data size is small than page size', () => {
    const testTransactions = mount(
      <Transactions
        transactions={mockedTransactions}
        totalTransactionLength={mockedTransactions.length - 1}
      />
    );

    expect(testTransactions.find('.pagination').length).toBe(0);
  });
});
