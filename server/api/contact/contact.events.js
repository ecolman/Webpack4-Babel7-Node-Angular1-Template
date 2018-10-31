import { EventEmitter } from 'events';
import Sql from '../../../sqldb';
const ContactEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContactEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(initiative) {
  for (var e in events) {
    let event = events[e];
    initiative.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ContactEvents.emit(`${event}:${doc._id}`, doc);
    ContactEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Sql.Contact);
export default ContactEvents;
