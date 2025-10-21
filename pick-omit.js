function pick(obj, keys) {
  const result = {};
  const keyList = Array.isArray(keys) ? keys : [keys];

  for (const key of keyList) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }

  return result;
}

function omit(obj, keys) {
  const result = {};
  const keyList = Array.isArray(keys) ? keys : [keys];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keyList.includes(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}
