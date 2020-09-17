
var notesData = require("../db/db.json");

module.exports = function(app){

    app.get("/api/notes", function(req, res) {
        res.json(notesData)
    });
    
    app.post("/api/notes", function(req, res) {
    
        //data sent to server is stored in req.body
        var newNote = (req.body);
    
        console.log(newNote);
    
        notesData.push(newNote);
    
        res.json(newNote);
    
    })

}