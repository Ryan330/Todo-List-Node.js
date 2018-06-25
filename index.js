//Init Express.js
const express = require("express");
const app = express();
const static = express.static;
const expressHbs = require("express-handlebars");

app.engine(".hbs", expressHbs({defaultLayout: "layout", extname: ".hbs"}));
app.set("view engine", ".hbs");

app.use(static("public"));

//Body Parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

//Init Database
const todoList = require("./db");




//Todo List Homepage
app.get("/", (request, response) => {
    todoList.getAll()
    .then((data) => {
        console.log(data);
        response.render("homepage", {
            todos: data
        });
    })
    .catch((error) => { console.log(error)});
});


//Add New Todo to List
app.get("/new", (request, response) => {
    response.render("todo-create");
});

app.post("/new", (request, response) => {
    console.log(request.body);
    todoList.add(request.body.title)
        .then((data) => {
            response.redirect(`/${data.id}`);
        })
});


//Todo Details Page
app.get("/:id", (request, response) => {
    todoList.getOne(request.params.id)
    .then((data) => {
        console.log(data);
        response.render("todo-details", data);
    })
    .catch((error) => { console.log(error)});
});


//Edit Todo List
app.get("/:id/edit", (request, response) => {
    todoList.getOne(request.params.id)
    .then((data) => {
        response.render("todo-edit", data);
    })
    .catch((error) => { console.log(error)});
});

app.post("/edit", (request, response) => {
    todoList.setTitle(request.body.id, request.body.title)
        .then(response.redirect(`/${request.body.id}`));
});


//Delete Todo List
app.get("/:id/delete", (request, response) => {
    todoList.getOne(request.params.id)
    .then((data) => {
        response.render("todo-delete", data);
    })
    .catch((error) => { console.log(error)});
});

app.post("/delete", (request, response) => {
    todoList.deleteById(request.body.id)
    .then((data) => {
        response.redirect("/");
    })
    .catch((error) => { console.log(error)});
});



//Create Server
app.listen(3000, () => {
    console.log("Server: http://localhost:3000");
});