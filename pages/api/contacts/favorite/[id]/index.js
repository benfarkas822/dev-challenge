const sqlite = require('sqlite');
const sqlite3 = require('sqlite3')

export default async function setFavouriteById(
    req,
    res
) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if (req.method === 'PUT') {
        const statement = await db.prepare(
            'UPDATE Contacts SET is_favourite=? where id = ?'
        );
        await statement.run(
            req.body.favourite,
            req.query.id
        );
        const contact = await db.get('select * from contacts');
        res.status(200).json(contact);
    }
}
