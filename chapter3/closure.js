/**
 * Execute given function 200 ms later
 * @param {function} callback
 */
function asyncFuntion(callback) {
  setTimeout(callback, 200);
}

let color = 'blue';

(function(color) {
  asyncFuntion(function() {
    console.log('The color is ' + color);
  });
})(color);

color = 'green';
