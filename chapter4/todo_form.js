const http = require('http');
const qs = require('querystring');
const items = [];

/**
 * Generate html and send it
 * @param {*} res
 */
function show(res) {
  const html = '<html><head><title>To-do</title></head><body>'
             + '<h1>To-do List</h1>'
             + '<ul>'
             + items.map(function(item) {
                 return '<li>' + item + '</li>';
               }).join('')
             + '</ul>'
             + '<form method="POST" action="/">'
             + '<p><input type="text" name="item" /></p>'
             + '<p><input type="submit" value="Add Item" /></p>'
             + '</form></body></html>';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
};

/**
 * Send 404
 * @param {*} res
 */
function notFound(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not Found');
};

/**
 * Send 400
 * @param {*} res
 */
function badRequest(res) {
  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bad Request');
};

/**
 * Add items to list
 * @param {*} req
 * @param {*} res
 */
function add(req, res) {
  let body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    const obj = qs.parse(body);
    items.push(obj.item);
    show(res);
  });
};

const server = http.createServer(function(req, res) {
  if ('/' === req.url) {
    switch (req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        add(req, res);
        break;
      default:
        badRequest(res);
    }
  } else {
    notFound(res);
  }
});

server.listen(3000);
