function filterKeys(obj, predicate) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (predicate(key)) {
        result[key] = obj[key];
      }
    }
  }

  return result;
}

function mapKeys(obj, transform) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = transform(key);
      result[newKey] = obj[key];
    }
  }

  return result;
}

function reduceKeys(obj, reducer, initialValue) {
  let accumulator = initialValue;
  let isFirst = initialValue === undefined;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isFirst) {
        accumulator = key;
        isFirst = false;
      } else {
        accumulator = reducer(accumulator, key);
      }
    }
  }

  return accumulator;
}

function filterValues(obj, predicate) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (predicate(obj[key])) {
        result[key] = obj[key];
      }
    }
  }

  return result;
}

function mapValues(obj, transform) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = transform(obj[key]);
    }
  }

  return result;
}

function reduceValues(obj, reducer, initialValue) {
  let accumulator = initialValue;
  let isFirst = initialValue === undefined;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isFirst) {
        accumulator = obj[key];
        isFirst = false;
      } else {
        accumulator = reducer(accumulator, obj[key]);
      }
    }
  }

  return accumulator;
}