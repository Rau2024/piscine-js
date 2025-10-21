#!/usr/bin/env node

import { writeFile, readFile, rm, access } from 'fs/promises';

const [,, file, cmd, elem, numArg] = process.argv;

const helpText = `Commands:
- create: takes a filename as argument and create it (should have ".json" extension specified)
- delete: takes a filename as argument and delete it
- add: takes a filename, an element name, and optionally a number to add (default 1)
- rm: takes a filename, an element name, and optionally a number to remove (default: remove entry)
- ls: print the list in the file
- help: print this help message`;

async function main() {
  if (cmd === 'help' || !cmd) {
    console.log(helpText);
    return;
  }
  if (!file && cmd !== 'help') {
    console.error('No file specified.');
    return;
  }
  if (cmd === 'create') {
    await writeFile(file, '{}');
    return;
  }
  if (cmd === 'delete') {
    try { await rm(file); } catch {}
    return;
  }
  if (cmd === 'ls') {
    try {
      const data = JSON.parse(await readFile(file, 'utf-8'));
      const keys = Object.keys(data);
      if (!keys.length) {
        console.log('Empty list.');
        return;
      }
      for (const k of keys) {
        console.log(`- ${k} (${data[k]})`);
      }
    } catch {
      console.log('Empty list.');
    }
    return;
  }
  if (cmd === 'add' || cmd === 'rm') {
    if (!elem) {
      console.error('No elem specified.');
      return;
    }
    let n = Number(numArg);
    if (isNaN(n)) n = undefined;
    let data = {};
    try {
      data = JSON.parse(await readFile(file, 'utf-8'));
    } catch {}
    if (cmd === 'add' || (cmd === 'rm' && n < 0)) {
      let toAdd = n === undefined ? 1 : (cmd === 'rm' ? Math.abs(n) : n);
      if (elem in data) {
        data[elem] += toAdd;
      } else {
        data[elem] = toAdd;
      }
      if (data[elem] <= 0) delete data[elem];
      await writeFile(file, JSON.stringify(data, null, 2));
      return;
    }
    if (cmd === 'rm') {
      if (n === undefined) {
        // remove entry
        delete data[elem];
        await writeFile(file, JSON.stringify(data, null, 2));
        return;
      }
      if (isNaN(Number(numArg))) {
        console.error('Unexpected request: nothing has been removed.');
        return;
      }
      // rm with number (n > 0)
      let changed = false;
      if (elem in data) {
        data[elem] -= n;
        if (data[elem] <= 0) delete data[elem];
        changed = true;
      }
      // Если элемента не было, ничего не делаем, но всё равно пишем файл (на случай пустого списка)
      await writeFile(file, JSON.stringify(data, null, 2));
      return;
    }
  }
  // Если команда не распознана
  console.log(helpText);
}

main();