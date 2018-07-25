const http = require('http');
const formidable = require('formidable');
const server = http.createServer(function(req, res) {
  switch (req.method) {
    case 'GET':
      show(req, res);
      break;
    case 'POST':
      upload(req, res);
      break;
  }
});

/**
 * Send html
 * @param {*} req
 * @param {*} res
 */
function show(req, res) {
  const html = ''
             + '<form method="post" action="/" enctype="multipart/form-data">'
             + '<p><input type="text" name="name" /></p>'
             + '<p><input type="file" name="file" /></p>'
             + '<p><input type="submit" name="Upload" /></p>'
             + '</form>';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
};

/**
 * Upload files from form to ./tmp
 * @param {*} req
 * @param {*} res
 */
function upload(req, res) {
  if (!isFormData(req)) {
    res.statusCode = 400;
    res.end('Bad Request: expecting multipart/form-data');
    return;
  }

  const form = new formidable.IncomingForm({
    uploadDir: __dirname + '/tmp',
  });

  form.parse(req, function(err, fields, files) {
    console.log(fields);
    console.log(files);
    res.end('upload complete!');
  });

  form.on('progress', function(bytesReceved, bytesExpected) {
    const percent = Math.floor(bytesReceved / bytesExpected * 100);
    console.log(percent);
  });
};

/**
 * Check request is form data or not
 * @param {*} req
 * @return {bool} form data or not
 */
function isFormData(req) {
  const type = req.headers['content-type'] || '';
  return 0 == type.indexOf('multipart/form-data');
}

server.listen(3000);
