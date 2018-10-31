import Sql from './index';
import { config } from '../config';

export default function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    const promises = [];

    promises.push(Sql.Contact.findOrCreate({where: {contactId: 1}, defaults: {firstName: 'Test', lastName: 'User'}}));

    return Promise.all(promises).then(function() {
      console.log('all data seeded!!');
    });
  }
}
