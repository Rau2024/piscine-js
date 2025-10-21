// uninvited.mjs

import http from 'http';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

const PORT = 5000;
const GUESTS_DIR = join(cwd(), 'guests');

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }

  const guestName = req.url?.slice(1); // /Ronaldinho -> Ronaldinho

  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const filePath = join(GUESTS_DIR, `${guestName}.json`);
    try {
      await writeFile(filePath, body); // Сохраняем как есть, даже если это не JSON
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(body); // Возвращаем как есть
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'server failed' }));
    }
  });

  req.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
  });
});

server.listen(PORT, () => {
  console.log(`🟢 Server is listening on port ${PORT}`);
});
