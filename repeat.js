const repeat = (str, n) => {
  if (n <= 0) return '';
  let result = '';
  for (let i = 0; i < n; i++) {
    result += str;
  }
  return result;
};
