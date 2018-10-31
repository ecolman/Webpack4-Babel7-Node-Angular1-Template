// When the user disconnects.. perform this
function onDisconnect(/*socket*/) {}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/portal/favorite/favorite.socket').register(socket);
  require('../api/product-plan/product-plan.socket').register(socket);
  require('../api/project/project.socket').register(socket);
  require('../api/project/milestone/milestone.socket').register(socket);
  require('../api/comment/comment.socket').register(socket);
}

export default function(socketio) {
  socketio.setMaxListeners(10);

  socketio.on('connection', function(socket) {
    socket.setMaxListeners(20);
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
}
