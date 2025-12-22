const mysql2 = require("mysql2")

const pool = mysql2.createPool({
    host : "localhost",
    user : "root",
    password : "Manager",
    database : "mern_db"

});

module.exports = pool;