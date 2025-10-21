// verydisco.mjs

function makeVeryDiscoWord(word) {
  const mid = Math.ceil(word.length / 2);
  return word.slice(mid) + word.slice(0, mid);
}

function veryDisco(args) {
  if (args.length === 0) return "";

  if (args.length === 1) {
    return args[0]
      .split(" ")
      .map(makeVeryDiscoWord)
      .join(" ");
  } else {
    return makeVeryDiscoWord(args[0]);
  }
}

// Экспортируем основную функцию
export { veryDisco };
