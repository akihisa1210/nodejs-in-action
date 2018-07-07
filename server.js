const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3000);
console.log('server running at http://localhost:3000/');
