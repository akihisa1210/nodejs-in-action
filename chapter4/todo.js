const http = require('http');
const url = require('url');
const items = [];
let item = '';

const server = http.createServer(function(req, res) {
  switch (req.method) {
    case 'POST':
      item = '';
      req.setEncoding('utf8');

      req.on('data', function(chunk) {
        item += chunk;
      });

      req.on('end', function() {
        items.push(item);
        res.end('OK\n');
      });

      break;

    case 'GET':
      let body = '';

      if (items.length !== 0) {
        body = items.map(function(item, index) {
          return index + ') ' + item;
        }).join('\n');
      }

      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');

      res.end(body);

      break;

    case 'DELETE':
      const path = url.parse(req.url).pathname;
      const id = parseInt(path.slice(1), 10);
      console.log(path, id);

      if (isNaN(id)) {
        res.statusCode = 400;
        res.end('Invalid item id');
      } else if (!items[id]) {
        res.statusCode = 404;
        res.end('Item not found');
      } else {
        items.splice(id, 1);
        res.end('OK\n');
      }

      break;
  }
});

server.listen(3000);
