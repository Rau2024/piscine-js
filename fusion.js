function fusion(obj1, obj2) {
  const result = {};

  // Создаём множество всех ключей из обоих объектов
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of keys) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    // Если ключ присутствует только в одном из объектов
    if (!(key in obj1)) {
      result[key] = val2;
    } else if (!(key in obj2)) {
      result[key] = val1;
    } else {
      // Оба значения присутствуют
      if (Array.isArray(val1) && Array.isArray(val2)) {
        result[key] = val1.concat(val2);
      } else if (typeof val1 === "string" && typeof val2 === "string") {
        result[key] = val1 + " " + val2;
      } else if (typeof val1 === "number" && typeof val2 === "number") {
        result[key] = val1 + val2;
      } else if (
        typeof val1 === "object" &&
        val1 !== null &&
        typeof val2 === "object" &&
        val2 !== null &&
        !Array.isArray(val1) &&
        !Array.isArray(val2)
      ) {
        result[key] = fusion(val1, val2); // рекурсивное слияние
      } else {
        result[key] = val2; // типы не совпали — берём значение из второго объекта
      }
    }
  }

  return result;
}
