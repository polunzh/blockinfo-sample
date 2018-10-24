import lib from '../lib';

describe('#groupTransactionsByAddress', () => {
  const transactions = [
    { addr: 1, value: 0 },
    { addr: 1, value: 1 },
    { addr: 2, value: 3 },
  ];

  test('#should make common addr in one group', () => {
    const result = lib.groupTransactionsByAddress(transactions);

    expect(Object.keys(result).length).toBe(2);
    expect('1' in result).toBeTruthy();
    expect('2' in result).toBeTruthy();
  });

  test('#should calculate the some of value that with same addr', () => {
    const result = lib.groupTransactionsByAddress(transactions);

    expect(result['1']).toBe(1);
    expect(result['2']).toBe(3);
  });
});
