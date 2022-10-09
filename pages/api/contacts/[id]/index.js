const sqlite = require('sqlite');
const sqlite3 = require('sqlite3')

export default async function getContactById(
    req,
    res
) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    if (req.method === 'PUT') {
        const statement = await db.prepare(
            'UPDATE contacts SET name= ?, email = ?, phone_number = ?, photo = ? where id = ?'
        );
        await statement.run(
            req.body.name,
            req.body.email,
            req.body.phoneNumber,
            req.body.photo,
            req.query.id
        );
        const contact = await db.get('select * from contacts');
        res.status(200).json(contact);
    }
    if (req.method === 'GET') {
        const contact = await db.get('select * from contacts where id = ?', [
            req.query.id
        ]);
        res.json(contact);
    }

    if (req.method === 'DELETE') {
        await db.run('delete from contacts where id = ?', [
            req.query.id
        ]);
        res.json('Törlés sikeres');
    }

}
