const multiply = (a, b) => {
  let result = 0;
  const positive = Math.abs(b);
  for (let i = 0; i < positive; i++) {
    result += a;
  }
  return b < 0 ? -result : result;
};

const divide = (a, b) => {
  if (b === 0) throw new Error('Cannot divide by zero');
  let quotient = 0;
  const neg = a < 0 !== b < 0;
  let x = Math.abs(a);
  const y = Math.abs(b);

  while (x >= y) {
    x -= y;
    quotient++;
  }

  return neg ? -quotient : quotient;
};

const modulo = (a, b) => {
  if (b === 0) throw new Error('Cannot modulo by zero');
  const div = divide(a, b);
  return a - multiply(div, b);
};
