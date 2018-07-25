/**
 * HTTPS server
 * create a secret key (key.pem) and certificate (key-cert.pem)
 * for https connection
 *
 * openssl genrsa 1024 > key.pem
 * openssl req -x509 -new -key key.pem > key-cert.pem
 */

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem'),
};

https.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(3000);
