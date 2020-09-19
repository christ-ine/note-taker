
var notesData = require("../db/db.json");
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
var path = require("path");
const thenableWriteFile = util.promisify(fs.writeFile);


module.exports = function(app){

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });
    
    app.post("/api/notes", function(req, res) {
    
        //data sent to server is stored in req.body
        var noteId = uuidv4();
        var newNote = {
            id: noteId,
            title: req.body.title,
            text: req.body.text,
        }
    
        console.log(newNote);
    
        

        fs.readFile("./db/db.json", "utf8", (err, data) => {

            if (err) throw err;

            const allNotes = JSON.parse(data);

            allNotes.push(newNote);

            fs.writeFile("./db/db.json", JSON.stringify(allNotes), err => {
                if (err) throw (err);
                res.send(notesData)
                console.log("Note successfully saved!")
                
            })

        })

        
    
    })

    app.delete("/api/notes/:id", function(req, res){
        var noteDelete = req.params.id;

        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;

            const allNotes = JSON.parse(data);

            const newNotebook = allNotes.filter(note => note.id != noteDelete);

            fs.writeFile("./db/db.json", JSON.stringify(newNotebook), err => {
                if (err) throw (err);
                res.send(notesData);
                console.log("Note successfully deleted!")


            })
        })

        

    })

}