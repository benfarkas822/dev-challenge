const sqlite = require('sqlite');
const sqlite3 = require('sqlite3')

export default async function addContact(
    req,
    res
) {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    if (req.method === 'POST') {
        const statement = await db.prepare(
            'insert into contacts (name, email,phone_number, photo) values (?,?,?,?)'
        )
        await statement.run(
            req.body.name,
            req.body.email,
            req.body.phoneNumber,
            req.body.photo
        );
        const contact = await db.all('select * from contacts');
        res.status(200).json(contact)
    }
    await db.close()

}
