var express = require('express');
var path = require('path')

var app = express();

var PORT = process.env.PORT || 3000;
var notesData = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html" ))
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html" ))
});

app.get("/api/notes", function(req, res) {
    res.json(notesData)
});

app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
});