function replica(target, ...sources) {
  for (const source of sources) {
    if (source && typeof source === 'object') {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          const sourceValue = source[key];

          if (sourceValue === null || typeof sourceValue !== 'object') {
            target[key] = sourceValue;
          } else if (sourceValue instanceof Date) {
            target[key] = new Date(sourceValue);
          } else if (sourceValue instanceof RegExp) {
            target[key] = new RegExp(sourceValue);
          } else if (sourceValue instanceof Function) {
            target[key] = sourceValue;
          } else if (Array.isArray(sourceValue)) {
            target[key] = sourceValue.map(item => {
              if (item === null || typeof item !== 'object') {
                return item;
              } else if (item instanceof Date) {
                return new Date(item);
              } else if (item instanceof RegExp) {
                return new RegExp(item);
              } else if (item instanceof Function) {
                return item;
              } else if (Array.isArray(item)) {
                const copy = [];
                replica(copy, item);
                return copy;
              } else {
                const copy = {};
                replica(copy, item);
                return copy;
              }
            });
          } else {
            if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
              target[key] = {};
            }
            replica(target[key], sourceValue);
          }
        }
      }
    }
  }

  return target;
}