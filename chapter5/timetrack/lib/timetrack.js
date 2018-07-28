const qs = require('querystring');

exports.sendHtml = (res, html) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
};

exports.parseReceiveData = (req, callback) => {
  let body = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const data = qs.parse(body);
    callback(data);
  });
};

exports.actionForm = (id, path, label) => {
  const html = '<form method="POST" action="' + path + '">'
             + '<input type="hidden" name="id" value="' + id + '">'
             + '<input type="submit" value="' + label + '" />'
             + '</form>';
  return html;
};

exports.add = (db, req, res) => {
  exports.parseReceiveData(req, (work) => {
    db.query(
      'INSERT INTO work (hours, date, description) ' +
      'VALUES (?, ?, ?)',
      [work.hours, work.date, work.description],
      (err) => {
        if (err) throw err;
        exports.show(db, res);
      }
    );
  });
};

exports.delete = (db, req, res) => {
  exports.parseReceiveData(req, (work) => {
    db.query(
      'DELETE FROM work WHERE id=?',
      [work.id],
      (err) => {
        if (err) throw err;
        exports.show(db, res);
      }
    );
  });
};

exports.archive = (db, req, res) => {
  exports.parseReceiveData(req, (work) => {
    db.query(
      'UPDATE work SET archived=1 WHERE id=?',
      [work.id],
      (err) => {
        if (err) throw err;
        exports.show(db, res);
      }
    );
  });
};

exports.show = (db, res, showArchived) => {
  const query = 'SELECT * FROM work '
              + 'WHERE archived=? '
              + 'ORDER BY date DESC';
  const archiveValue = (showArchived) ? 1 : 0;
  db.query(
    query,
    [archiveValue],
    (err, rows) => {
      if (err) throw err;
      html = (showArchived)
        ? ''
        : '<a href="/archived">Archived Work<br/>';
      html += exports.workHitlistHtml(rows);
      html += exports.workFormHtml();
      exports.sendHtml(res, html);
    }
  );
};

exports.showArchived = (db, res) => {
  exports.show(db, res, true);
};

exports.workHitlistHtml = (rows) => {
  let html = '<table>';
  console.log(rows);
  for (const row of rows) {
    html += '<tr>';
    html += '<td>' + row.date + '</td>';
    html += '<td>' + row.hours + '</td>';
    html += '<td>' + row.description + '</td>';
    if (!row.archived) {
      html += '<td>' + exports.workArchiveForm(row.id) + '</td>';
    }
    html += '<td>' + exports.workDeleteForm(row.id) + '</td>';
    html += '</tr>';
  }
  html += '</table>';
  return html;
};

exports.workFormHtml = () => {
  const html = '<form method="POST" action="/">'
             + '<p>Date (YYYY-MM-DD):<br /><input name="date" type="text"></p>'
             + '<p>Hours worked:<br /><input name="hours" type="text"></p>'
             + '<p>Description:<br />'
             + '<textarea name="description"></textarea></p>'
             + '<input type="submit" value="Add" />'
             + '</form>';
  return html;
};

exports.workArchiveForm = (id) => {
  return exports.actionForm(id, '/archive', 'Archive');
};

exports.workDeleteForm = (id) => {
  return exports.actionForm(id, '/delete', 'Delete');
};
