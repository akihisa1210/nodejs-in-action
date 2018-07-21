const events = require('events');
const net = require('net');

const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
  const welcome = 'Welcome!\n'
                + 'Guest online: ' + this.listeners('broadcast').length;
  client.write(welcome + '\n');
  console.log('Server: join event is received');
  this.clients[id] = client;
  this.subscriptions[id] = function(senderId, message) {
    if (id != senderId) {
      this.clients[id].write(message);
    }
  };
  this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id) {
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + ' has left the chat.\n');
});

channel.on('shutdown', function() {
  channel.emit('broadcast', '', 'Chat has shut down.\n');
  channel.removeAllListeners('broadcast');
});

channel.setMaxListeners(50);

const server = net.createServer(function(client) {
  console.log('Server: tcp server created');

  const id = client.remoteAddress + ':' + client.remotePort;
  console.log('Server: client id is ' + id);

  console.log('Server: join event is emitted');
  channel.emit('join', id, client);

  client.on('data', function(data) {
    console.log('Server: broadcast event is emitted');
    data = data.toString();
    if (data == 'shutdown\r\n') {
      channel.emit('shutdown');
    }
    channel.emit('broadcast', id, data);
  });

  client.on('close', function() {
    channel.emit('leave', id);
  });
});

server.listen(3000);
