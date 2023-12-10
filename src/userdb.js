import fs from 'fs/promises';
import client from './dbclient.js';

async function init_db() {
  try {
    const users = client.db('lab5db').collection('users');

    if (users.countDocuments() == 0) {
      await fs
        .readFile('./user.json')
        .then((data) => {
          const inserted = users.insertMany(JSON.parse(data));
          console.log(`Added ${inserted} users`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log('Unable to initialize the database!');
  }
}
init_db().catch(console.dir);
