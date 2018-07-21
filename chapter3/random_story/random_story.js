const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';

/**
 * Confirm that there is a file which contains RSS feed url list.
 */
function checkForRSSFile() {
  fs.exists(configFilename, function(exist) {
    if (!exist) {
      return next(new Error('Missing Rss file: ' + configFilename));
    }
    next(null, configFilename);
  });
};

/**
 * Read a file which contains RSS feed url.
 * @param {string} configFilename
 */
function readRSSFile(configFilename) {
  fs.readFile(configFilename, function(err, feedList) {
    if (err) return next(err);
    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, '')
      .split('\n');
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
};

/**
 * Download the RSS feed.
 * @param {string} feedUrl
 */
function downloadRSSFeed(feedUrl) {
  request({url: feedUrl}, function(err, res, body) {
    if (err) return next(err);
    if (res.statusCode != 200) {
      return next(new Error('Abnormal response status code'));
    }
    next(null, body);
  });
};

/**
 * Parse RSS feed.
 * @param {string} rss
 * @return {*}
 */
function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) {
    return next(new Error('No RSS items found'));
  }
  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
};

const tasks = [checkForRSSFile,
              readRSSFile,
              downloadRSSFeed,
              parseRSSFeed];

/**
 * Execute the next task.
 * @param {*} err
 * @param {*} result
 */
function next(err, result) {
  if (err) throw err;
  const currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
};

next();
