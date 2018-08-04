const redis = require('redis');
const redisHost = 'localhost';
const redisPort = 6379;
const redisPassword = 'hoge';
const client = redis.createClient({
  'host': redisHost,
  'port': redisPort,
  'auth_pass': redisPassword,
});

client.on('error', (err) => {
  console.log('Error ' + err);
});

client.set('color', 'red', redis.print);

client.get('color', (err, values) => {
  if (err) throw err;
  console.log('Get: ' + values);
});
