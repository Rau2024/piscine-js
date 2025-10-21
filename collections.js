const arrToSet = (arr) => new Set(arr);

const arrToStr = (arr) => arr.join('');

const setToArr = (set) => [...set];

const setToStr = (set) => [...set].join('');

const strToArr = (str) => str.split('');

const strToSet = (str) => new Set(str);

const mapToObj = (map) => {
  const obj = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
};

const objToArr = (obj) => Object.values(obj);
const objToMap = (obj) => new Map(Object.entries(obj));

const arrToObj = (arr) => {
  const obj = {};
  arr.forEach((val, i) => {
    obj[i] = val;
  });
  return obj;
};

const strToObj = (str) => {
  const obj = {};
  str.split('').forEach((char, i) => {
    obj[i] = char;
  });
  return obj;
};


const superTypeOf = (value) => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'Array';
  if (value instanceof Map) return 'Map';
  if (value instanceof Set) return 'Set';
  if (value instanceof Function) return 'Function';
  if (typeof value === 'object') return 'Object';
  return typeof value === 'string' ? 'String'
       : typeof value === 'number' ? 'Number'
       : typeof value === 'boolean' ? 'Boolean'
       : typeof value === 'undefined' ? 'undefined'
       : typeof value; // fallback
};
