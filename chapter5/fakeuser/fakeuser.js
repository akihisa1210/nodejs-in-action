const pg = require('pg');
const faker = require('faker');

const name = faker.name.firstName();
const age = Math.floor(Math.random() * 100);
const city = faker.address.city();

const conString = 'tcp://postgres:root@localhost:5432/mydatabase';

const client = new pg.Client(conString);
client.connect();

client.query(
  `INSERT INTO users` +
  `(name, age, city) VALUES ($1, $2, $3)`,
  [name, age, city],
  (err) => {
    if (err) throw err;
    client.query(
      'SELECT * FROM users',
      (err, result) => {
        if (err) throw err;
        console.log(result.rows);
        client.end();
      }
    );
  }
);
