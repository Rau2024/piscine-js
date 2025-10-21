const reverse = (input) => {
  const isString = typeof input === 'string';
  const arr = isString ? input.split('') : input.slice(); // копируем массив

  const len = arr.length;
  for (let i = 0; i < len / 2; i++) {
    const temp = arr[i];
    arr[i] = arr[len - 1 - i];
    arr[len - 1 - i] = temp;
  }

  return isString ? arr.join('') : arr;
};
