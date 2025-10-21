function defaultCurry(obj1) {
  return function (obj2) {
    return { ...obj1, ...obj2 };
  };
}

function mapCurry(fn) {
  return function (obj) {
    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const [newKey, newValue] = fn([key, obj[key]]);
        result[newKey] = newValue;
      }
    }
    return result;
  };
}

function reduceCurry(fn) {
  return function (obj, initialValue) {
    let accumulator = initialValue;
    let isFirst = initialValue === undefined;

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (isFirst) {
          accumulator = obj[key];
          isFirst = false;
        } else {
          accumulator = fn(accumulator, [key, obj[key]]);
        }
      }
    }

    return accumulator;
  };
}

function filterCurry(fn) {
  return function (obj) {
    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (fn([key, obj[key]])) {
          result[key] = obj[key];
        }
      }
    }
    return result;
  };
}

function reduceScore(personnel, initialValue = 0) {
  return reduceCurry((acc, [k, v]) => {
    if (v.isForceUser) {
      return acc + v.pilotingScore + v.shootingScore;
    }
    return acc;
  })(personnel, initialValue);
}

function filterForce(personnel) {
  return filterCurry(([k, v]) => v.isForceUser && v.shootingScore >= 80)(personnel);
}

function mapAverage(personnel) {
  return mapCurry(([k, v]) => [
    k,
    {
      ...v,
      averageScore: (v.pilotingScore + v.shootingScore) / 2
    }
  ])(personnel);
}