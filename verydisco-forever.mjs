// verydisco-forever.mjs

import fs from 'fs';
import { veryDisco } from './verydisco.mjs';

const args = process.argv.slice(2);
const result = veryDisco(args);

fs.writeFileSync('verydisco-forever.txt', result);
