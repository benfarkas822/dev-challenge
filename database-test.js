const sqlite = require('sqlite');
const sqlite3 = require('sqlite3')

async function setup() {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    await db.migrate({migrationsPath: './migrations/', force: 'last'});

    const contacts = await db.all('SELECT * FROM contacts');
    console.log('ALL Contacts', JSON.stringify(contacts, null, 4));

}

setup();
