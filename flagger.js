function flags(obj) {
  const result = {
    alias: {},
    description: ''
  };


  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.alias[key[0]] = key;
    }
  }


  if (!result.alias.h) {
    result.alias.h = 'help';
  }


  let flagsToDescribe = [];

  if (obj.help && Array.isArray(obj.help)) {

    flagsToDescribe = obj.help;
  } else {

    flagsToDescribe = Object.keys(obj).filter(key => key !== 'help');
  }


  const descriptions = [];
  for (const flag of flagsToDescribe) {
    if (obj[flag]) {
      const alias = flag[0];
      descriptions.push(`-${alias}, --${flag}: ${obj[flag]}`);
    }
  }

  result.description = descriptions.join('\n');

  return result;
}