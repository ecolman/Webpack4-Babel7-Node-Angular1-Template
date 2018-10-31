import ContactEvents from './contact.events';

// Model events to emit
const events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    let event = events[i];
    let listener = createListener(`Initiative:${event}`, socket);

    ContactEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return doc => {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return () => {
    ContactEvents.removeListener(event, listener);
  };
}
