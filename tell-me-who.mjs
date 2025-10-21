// tell-me-who.mjs

import fs from 'fs/promises';
import path from 'path';

const args = process.argv.slice(2);
const dirPath = args[0] || ".";

try {
  const files = await fs.readdir(dirPath);

  const guestNames = files
    .map(filename => filename.slice(0, filename.lastIndexOf("."))) // убираем .json
    .map(name => name.split("_")) // [Firstname, Lastname]
    .map(([first, last]) => `${last} ${first}`) // Lastname Firstname
    .sort();

  guestNames.forEach((guest, index) => {
    console.log(`${index + 1}. ${guest}`);
  });

} catch (err) {
  console.error(`❌ Error reading directory "${dirPath}":`, err.message);
}
