// verydisco-reverso.mjs

import fs from 'fs';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Please provide a file name");
  process.exit(1);
}

const filename = args[0];

function reverseVeryDiscoWord(word) {
  const mid = Math.floor(word.length / 2);
  const firstPart = word.slice(0, mid);
  const secondPart = word.slice(mid);
  return secondPart + firstPart;
}

try {
  const content = fs.readFileSync(filename, 'utf-8');
  const words = content.trim().split(" ");
  const reversedWords = words.map(reverseVeryDiscoWord);
  console.log(reversedWords.join(" "));
} catch (err) {
  console.error(`Error reading file ${filename}:`, err.message);
}
