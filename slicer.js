const slice = (input, start, end) => {
  const isArray = Array.isArray(input);
  const length = input.length;

  // Обработка отрицательных индексов
  let from = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
  let to = end === undefined ? length : (end < 0 ? Math.max(length + end, 0) : Math.min(end, length));

  let result = isArray ? [] : '';

  for (let i = from; i < to; i++) {
    result = isArray ? [...result, input[i]] : result + input[i];
  }
  

  return result;
};
