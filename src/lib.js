const lib = {
  groupTransactionsByAddress(transactions) {
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
  },
};

export default lib;
