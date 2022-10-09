const sqlite = require('sqlite');
const sqlite3 = require('sqlite3')

export default async function getContacts(req, res) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    const contact = await db.all('select * from contacts');

    res.json(contact);
}
