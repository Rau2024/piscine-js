// Строка со специальными символами: ` \ / " '
const escapeStr = "`\\/\\" + '"' + "'";

// Массив: 4 и '2', замороженный
const arr = Object.freeze([4, '2']);

// Вложенные объекты и массивы, все заморожены
const nested = Object.freeze({
  arr: Object.freeze([4, undefined, '2']),
  obj: Object.freeze({
    str: 'nested string',
    num: 123,
    bool: false
  })
});

// Основной объект со всеми нужными свойствами, заморожен
const obj = Object.freeze({
  str: 'some string',
  num: 42,
  bool: true,
  undef: undefined,
  nested
});



