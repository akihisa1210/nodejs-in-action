const http = require('http');
let counter = 0;

const server = http.createServer(function(req, res) {
  counter++;
  res.write('I have been accessed ' + counter + ' times.');
  res.end();
}).listen(3000);

server;
