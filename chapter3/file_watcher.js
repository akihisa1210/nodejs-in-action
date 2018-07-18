/** Class representing a file watcher */
class Watcher {
  /**
   * Add directories which to be watched and which to put processed data.
   * @param {string} watchDir The directory which to be watched.
   * @param {string} processedDir The directory which to put processed data.
   */
  constructor(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }
}

const events = require('events');
const util = require('util');

util.inherits(Watcher, events.EventEmitter);

const fs = require('fs');
const watchDir = './watch';
const processedDir = './done';

Watcher.prototype.watch = function() {
  const watcher = this;
  fs.readdir(this.watchDir, function(err, files) {
    if (err) throw err;
    for (let index in files) {
      if (Object.prototype.hasOwnProperty.call(files, index)) {
        watcher.emit('process', files[index]);
      }
    }
  });
};

Watcher.prototype.start = function() {
  const watcher = this;
  fs.watchFile(watchDir, function() {
    watcher.watch();
  });
};

const watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function process(file) {
  const watchFile = this.watchDir + '/' + file;
  const processedFile = this.processedDir + '/' + file.toLowerCase();

  fs.rename(watchFile, processedFile, function(err) {
    if (err) throw err;
  });
});

watcher.start();
