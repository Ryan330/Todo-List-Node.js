//Init PG-Promise
const pgp = require("pg-promise")();
const cn = {
  host: "localhost",
  port: 5432,
  database: "todo-list",
  user: "postgres",
  password: ""
};
const db = pgp(cn);




//Select Todo from List by ID
function getOne(id) {
  return db.oneOrNone("select * from todolist where id=$1", [id]);
}


//Select All Todos on List
function getAll() {
  return db.any('select * from todolist')
}


//Select Unfinished Todo
function getPending() {
  return db.any('select * from todolist where isDone=false');
}


//Select Finished Todo
function getFinished() {
  return db.any('select * from todolist where isDone=true');
}


//Select Todo via String
function searchByTitle(searchString) {
  return db.any("select * from todolist where title ilike '%$1#%'", [searchString]);
}


//Delete Todo from List
function deleteById(id) {
  return db.result('delete from todolist where id=$1', [id]);
}


//Set Todo Finished
function setFinished(id, isDone) {
  return db.result('update todolist set isDone=$1 where id=$2', [isDone, id]);
}


//Change Todo
function setTitle(id, newTitle) {
  return db.result("update todolist set title='$1#' where id=$2", [newTitle, id]);
}


//Adds Todo to List
function add(title) {
  return db.one("insert into todolist (title, isDone) values ('$1#', false) returning id", [title]);
}


//Export All Functions
module.exports = {
  getOne,
  getAll,
  getPending,
  getFinished,
  searchByTitle,
  deleteById,
  setFinished,
  setTitle,
  add
};