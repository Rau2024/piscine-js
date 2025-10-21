const truncate = (n) => {
  let i = 1;
  while (i <= n) i *= 10;

  let result = 0;
  for (let d = i / 10; d >= 1; d /= 10) {
    let digit = 0;
    while (result + digit * d <= n) {
      digit++;
    }
    digit--;
    result += digit * d;
  }
  return result;
};

const trunc = (n) => {
  return n < 0 ? -truncate(-n) : truncate(n);
};

const floor = (n) => {
  const i = trunc(n);
  return n < i ? i - 1 : i;
};

const ceil = (n) => {
  const i = trunc(n);
  return n > i ? i + 1 : i;
};

const round = (n) => {
  const i = trunc(n);
  const d = n - i;
  if (n >= 0) return d >= 0.5 ? i + 1 : i;
  else return d <= -0.5 ? i - 1 : i;
};
