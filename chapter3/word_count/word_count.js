const fs = require('fs');
let completedTasks = 0;
let tasks = [];
let wordCounts = {};
const filesDir = './test';

/**
 * Check if all files are processed.
 */
function checkIfComplete() {
  completedTasks++;
  if (completedTasks === tasks.length) {
    for (let index in wordCounts) {
      if (Object.prototype.hasOwnProperty.call(wordCounts, index)) {
        console.log(index + ': ' + wordCounts[index]);
      }
    }
  }
};

/**
 * Count words in the given text.
 * @param {*} test
 */
function countWordsInText(test) {
  const words = test
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();
  for (let index in words) {
    if (Object.prototype.hasOwnProperty.call(words, index)) {
      let word = words[index];
      if (word) {
        wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
      }
    }
  }
};

fs.readdir(filesDir, function(err, files) {
  if (err) throw err;
  for (let index in files) {
    if (Object.prototype.hasOwnProperty.call(files, index)) {
      let task = (function(file) {
        return function() {
          fs.readFile(file, function(err, text) {
            if (err) throw err;
            countWordsInText(text);
            checkIfComplete();
          });
        };
      })(filesDir + '/' + files[index]);
      tasks.push(task);
    }
  }
  for (let task in tasks) {
    if (Object.prototype.hasOwnProperty.call(tasks, task)) {
      tasks[task]();
    }
  }
});
