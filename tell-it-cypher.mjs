// tell-it-cypher.mjs

import fs from 'fs/promises';

const args = process.argv.slice(2);
const [filePath, action, outputFile] = args;

if (!filePath || !action || !['encode', 'decode'].includes(action)) {
  console.error("❌ Usage: node tell-it-cypher.mjs <file> <encode|decode> [output.ext]");
  process.exit(1);
}

try {
  const content = await fs.readFile(filePath);

  let result;
  let defaultName;

  if (action === 'encode') {
    result = Buffer.from(content).toString('base64');
    defaultName = 'cypher.txt';
  } else if (action === 'decode') {
    result = Buffer.from(content.toString(), 'base64').toString('utf-8');
    defaultName = 'clear.txt';
  }

  const filenameToWrite = outputFile || defaultName;

  await fs.writeFile(filenameToWrite, result);
  console.log(`✅ Result saved to ${filenameToWrite}`);
} catch (err) {
  console.error(`❌ Error processing file:`, err.message);
}
