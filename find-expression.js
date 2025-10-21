const add4 = '+4'
const mul2 = '*2'

const findExpression = (target, current = 1, history = '1') => {
  if (current === target) return history;
  if (current > target) return undefined;

  // Рекурсивно пробуем два варианта
  return (
    findExpression(target, current + 4, history + ' ' + add4) ||
    findExpression(target, current * 2, history + ' ' + mul2)
  );
};
