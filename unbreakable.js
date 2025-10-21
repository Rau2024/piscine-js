const split = (str, sep) => {
  if (sep === '') {
    const result = [];
    for (let i = 0; i < str.length; i++) {
      result.push(str[i]);
    }
    return result;
  }

  const result = [];
  let buffer = '';
  let i = 0;

  while (i < str.length) {
    if (str.slice(i, i + sep.length) === sep) {
      result.push(buffer);
      buffer = '';
      i += sep.length;
    } else {
      buffer += str[i];
      i++;
    }
  }

  result.push(buffer);
  return result;
};


const join = (arr, sep) => {
  let result = '';

  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
    if (i < arr.length - 1) {
      result += sep;
    }
  }

  return result;
};
