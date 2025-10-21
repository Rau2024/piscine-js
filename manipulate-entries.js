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

function filterEntries(obj, predicate) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (predicate([key, obj[key]])) {
        result[key] = obj[key];
      }
    }
  }

  return result;
}

function mapEntries(obj, transform) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const [newKey, newValue] = transform([key, obj[key]]);
      result[newKey] = newValue;
    }
  }

  return result;
}

function reduceEntries(obj, reducer, initialValue) {
  let accumulator = initialValue;
  let isFirst = initialValue === undefined;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isFirst) {
        accumulator = [key, obj[key]];
        isFirst = false;
      } else {
        accumulator = reducer(accumulator, [key, obj[key]]);
      }
    }
  }

  return accumulator;
}

function totalCalories(cart) {
  const total = reduceEntries(cart, (acc, [item, grams]) => {
    const itemData = nutritionDB[item];
    if (itemData) {
      return acc + (itemData.calories * grams) / 100;
    }
    return acc;
  }, 0);
  return Math.round(total * 10) / 10;
}

function lowCarbs(cart) {
  return filterEntries(cart, ([item, grams]) => {
    const itemData = nutritionDB[item];
    if (itemData) {
      const totalCarbs = (itemData.carbs * grams) / 100;
      return totalCarbs < 50;
    }
    return false;
  });
}

function cartTotal(cart) {
  return mapEntries(cart, ([item, grams]) => {
    const itemData = nutritionDB[item];
    if (itemData) {
      const nutritionFacts = {};
      for (const nutrient in itemData) {
        const value = (itemData[nutrient] * grams) / 100;
        nutritionFacts[nutrient] = Math.round(value * 1000) / 1000;
      }
      return [item, nutritionFacts];
    }
    return [item, {}];
  });
}