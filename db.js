//Init PG Promise
const pgp = require('pg-promise')();

//Connect to Database
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'todo-list',
    user: 'postgres',
    password: ''
};

const db = pgp(cn);



//Database Functions
function importDataID(id) {
    db.any('select * from TodoList where id=$1', [id])
        .then(function(data) {
            //Success Data Import
            console.log(id);
        })
        .catch(function(error) {
            //Error Message
            console.log(error);
    });
};