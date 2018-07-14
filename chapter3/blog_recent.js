const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  getTitles(res);
});

const getTitles = (res) => {
  fs.readFile('./titles.json', (err, data) => {
    if (err) return hadError(err, res);
    getTemplates(JSON.parse(data.toString()), res);
    }
  );
};

const getTemplates = (titles, res) => {
  fs.readFile('./template.html', (err, data) => {
    if (err) return hadError(err, res);
    formatHtml(titles, data.toString(), res);
  });
};

const formatHtml = (titles, tmpl, res) => {
  const html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
};

const hadError = (err, res) => {
  console.log(err);
  res.end('Server Error');
};

server.listen(3000, '127.0.0.1');
