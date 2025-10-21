const chunk = (arr, size) => {
  const result = [];
  let i = 0;

  while (i < arr.length) {
    const subArray = [];
    for (let j = 0; j < size && i < arr.length; j++, i++) {
      subArray.push(arr[i]);
    }
    result.push(subArray);
  }

  return result;
};
