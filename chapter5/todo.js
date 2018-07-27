const fs = require('fs');
const path = require('path');
const args = process.argv.splice(2);

const command = args.shift();
const taskDescription = args.join(' ');
const file = path.join(process.cwd(), '/.tasks');

const loadOfInitializeTaskArray = (file, callback) => {
  fs.exists(file, (exists) => {
    if (exists) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = JSON.parse(data.toString() || '[]');
        callback(tasks);
      });
    } else {
      callback([]);
    }
  });
};

const listTasks = (file) => {
  loadOfInitializeTaskArray(file, (tasks) => {
    for (const task of tasks) {
      console.log(task);
    }
  });
};

const storeTasks = (file, tasks) => {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', (err) => {
    if (err) throw err;
    console.log('Saved.');
  });
};

const addTask = (file, taskDescription) => {
  loadOfInitializeTaskArray(file, (tasks) => {
    tasks.push(taskDescription);
    storeTasks(file, tasks);
  });
};

switch (command) {
  case 'list':
    listTasks(file);
    break;

  case 'add':
    addTask(file, taskDescription);
    break;

  default:
    console.log(
      `Usage: ${process.argv[0]} ${process.argv[1]} list|add [taskDescription]`
    );
}
