const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let db;

//Database class creation, references in other files are simply instances

class Database {
    constructor(file) {
        if (db) {
          return db;
        }
        const dbPath = path.join(__dirname, file); // create an absolute path to your database file
        this.db = new sqlite3.Database(dbPath, (err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Connected to the SQlite database.');
          this.createTables();
        });
        db = this;
      }

    createTables() {
      this.db.run(`CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL
      )`);
    }
}
module.exports = new Database('./revUp.sqlite');

function createDBInstance() {
  return new Database('./revUp.sqlite');
}

module.exports = createDBInstance;

