const nasa = (n) => {
  let res = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      res.push('NASA');
    } else if (i % 3 === 0) {
      res.push('NA');
    } else if (i % 5 === 0) {
      res.push('SA');
    } else {
      res.push(i);
    }
  }

  return res.join(' ');
};
