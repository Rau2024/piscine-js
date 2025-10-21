
const sign = (n) => {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
};

const sameSign = (a, b) => sign(a) === sign(b);