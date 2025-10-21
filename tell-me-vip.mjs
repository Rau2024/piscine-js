// tell-me-vip.mjs

import fs from 'fs/promises';
import path from 'path';

const args = process.argv.slice(2);
const dirPath = args[0] || ".";

function formatNameFromFilename(filename) {
  const name = filename.slice(0, filename.lastIndexOf(".")); // убираем расширение
  const [first, last] = name.split("_"); // Firstname_Lastname
  return `${last} ${first}`;
}

try {
  const files = await fs.readdir(dirPath);

  const filePaths = files.map(file => path.join(dirPath, file));

  const fileContents = await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    })
  );

  const vipGuests = files
    .map((filename, i) => ({
      name: formatNameFromFilename(filename),
      answer: fileContents[i].answer?.toLowerCase()
    }))
    .filter(guest => guest.answer === "yes")
    .map(guest => guest.name)
    .sort();

  const lines = vipGuests.map((name, index) => `${index + 1}. ${name}`);

  // Save to vip.txt
  await fs.writeFile("vip.txt", lines.join("\n"));

  // Also print to console
  lines.forEach(line => console.log(line));

} catch (err) {
  console.error("❌ Error:", err.message);
}
