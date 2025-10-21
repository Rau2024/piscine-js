is.num = (x) => typeof x === 'number';
is.nan = (x) => Number.isNaN(x);
is.str = (x) => typeof x === 'string';
is.bool = (x) => typeof x === 'boolean';
is.undef = (x) => x === undefined;
is.def = (x) => x !== undefined;
is.arr = (x) => Array.isArray(x);
is.obj = (x) =>
  x !== null &&
  typeof x === 'object' &&
  !Array.isArray(x) &&
  !(x instanceof Function);
is.fun = (x) => typeof x === 'function';
is.truthy = (x) => !!x;
is.falsy = (x) => !x;
