// friend-support.mjs

import http from 'http';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

const PORT = 5000;
const GUESTS_DIR = join(cwd(), 'guests');

const server = http.createServer(async (req, res) => {
  const guestName = req.url?.slice(1); // remove leading slash

  if (req.method !== 'GET' || !guestName) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'guest not found' }));
    return;
  }

  const filePath = join(GUESTS_DIR, `${guestName}.json`);

  try {
    const data = await readFile(filePath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'server failed' }));
    }
  }
});

server.listen(PORT, () => {
  console.log(`🟢 Server is listening on port ${PORT}`);
});
