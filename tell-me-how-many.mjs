// tell-me-how-many.mjs

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const dirPath = args[0] || "."; // если нет аргумента — текущая директория

try {
  const entries = fs.readdirSync(dirPath);
  console.log(entries.length);
} catch (err) {
  console.error(`❌ Error reading directory "${dirPath}":`, err.message);
}
