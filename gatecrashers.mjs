#!/usr/bin/env node

import { createServer } from 'http';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const PORT = 5000;
const FRIENDS = [
  'Caleb_Squires',
  'Tyrique_Dalton',
  'Rahima_Young'
];
const PASSWORD = 'abracadabra';

function parseAuth(header) {
  if (!header || !header.startsWith('Basic ')) return null;
  const base64 = header.slice(6);
  try {
    const decoded = Buffer.from(base64, 'base64').toString();
    const [user, pass] = decoded.split(':');
    return { user, pass };
  } catch {
    return null;
  }
}

const server = createServer((req, res) => {
  if (req.method === 'POST') {
    const auth = parseAuth(req.headers['authorization']);
    if (!auth || !FRIENDS.includes(auth.user) || auth.pass !== PASSWORD) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end('Authorization Required');
      return;
    }
    const name = decodeURIComponent(req.url.slice(1));
    if (!name) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'server failed' }));
      return;
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        let bodyString = body;
        if (!bodyString && req.headers['body']) {
          bodyString = req.headers['body'];
        }
        let toSave, toReturn;
        try {
          const json = JSON.parse(bodyString);
          toSave = JSON.stringify(json);
          toReturn = json;
        } catch {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'server failed' }));
          return;
        }
        const guestsDir = 'guests';
        const filePath = join(guestsDir, name + '.json');
        await mkdir(guestsDir, { recursive: true });
        await writeFile(filePath, toSave);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(toReturn));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'server failed' }));
      }
    });
  } else {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 