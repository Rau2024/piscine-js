const person = {
  name: 'Rick',
  age: 77,
  country: 'US',
};

// Create independent copies (deep copies)
const clone1 = { ...person }; // shallow copy is enough here since values are primitive
const clone2 = Object.assign({}, person);

// Create a reference to the same object
const samePerson = person;

// Modify the original object
person.age += 1;
person.country = 'FR';
