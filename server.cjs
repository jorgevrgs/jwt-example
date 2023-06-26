import { jwkPathname, port } from './constants.mjs';

const fs = require('fs');
const http = require('http');

// Read the key.json file
const keyData = fs.readFileSync('key.json', 'utf8');

// Create the HTTP server
const server = http.createServer((req, res) => {
  if (req.url === jwkPathname) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(keyData);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
