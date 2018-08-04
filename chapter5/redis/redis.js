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
  console.log('get: ');
  console.log(values);
});

client.hmset('camping', {
  'shelter': '2-person tent',
  'cooking': 'campstove',
}, redis.print);

client.hget('camping', 'cooking', (err, values) => {
  if (err) throw err;
  console.log('hget: ');
  console.log('Will be cooking with: ' + values);
});

client.hkeys('camping', (err, keys) => {
  if (err) throw err;
  console.log('hkeys:');
  for (let key of keys) {
    console.log(key);
  };
});

client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
client.lrange('tasks', 0, -1, (err, items) => {
  if (err) throw err;
  console.log('lrange:');
  for (let item of items) {
    console.log(item);
  }
});

client.sadd('ip.addresses', 'address1', redis.print);
client.sadd('ip.addresses', 'address1', redis.print);
client.sadd('ip.addresses', 'address2', redis.print);
client.smembers('ip.addresses', (err, members) => {
  if (err) throw err;
  console.log('smembers:');
  console.log(members);
});
