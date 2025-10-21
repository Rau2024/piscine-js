const indexOf = (arr, value, fromIndex = 0) => {
  const start = fromIndex < 0 ? Math.max(arr.length + fromIndex, 0) : fromIndex;
  for (let i = start; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
};

const lastIndexOf = (arr, value, fromIndex) => {
  let start = fromIndex !== undefined
    ? (fromIndex < 0 ? arr.length + fromIndex : Math.min(fromIndex, arr.length - 1))
    : arr.length - 1;

  for (let i = start; i >= 0; i--) {
    if (arr[i] === value) return i;
  }
  return -1;
};

const includes = (arr, value) => {
  return indexOf(arr, value) !== -1;
};
