const redis = require('redis');
const client = redis.createClient(6379, 'localhost');

client.on('error', (err) => {
  console.log('Error ' + err);
});

client.set('color', 'red', redis.print);

client.get('color', (err, values) => {
  if (err) throw err;
  console.log('Get: ' + values);
});
