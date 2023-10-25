const sqlite =require('sqlite3').verbose();
const axios = require('axios');
let sql;


// Connect a database
const db= new sqlite.Database('./users.db',sqlite.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err.message);
    }
    console.log('Connected to the users database');
});

// Create a table

sql = `CREATE TABLE IF NOT EXISTS users(ID INTEGER PRIMARY KEY AUTOINCREMENT, username, email, password )`;
db.run(sql);


//Get DATA

async function getData(url) {
    try {
        const { data } = await axios.get(url);

        if (typeof data === 'object' && data !== null) {
            let userData = {
                username: data.username,
                email: data.email,
                password: data.password,
            };
            sql = `INSERT INTO users(username, email, password) VALUES(?,?,?)`;
            db.run(sql, [userData.username, userData.email, userData.password], (err) => {
                if (err) {
                    return console.error(err.message);
                } else {
                    console.log(`Data inserted successfully`);
                }
            });
        } else {
            console.log('Data is not an object.');
        }
    } catch (err) {
        console.log(err);
    }
}



getData('https://random-data-api.com/api/users/random_user?search=20');

// Query all DB

sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
    });
});



