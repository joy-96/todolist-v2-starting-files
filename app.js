var module1 = require('./module1');
var module2 = require('./module2');


const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));


app.get("/", function(req, res) {
    res.render("/home");

});



app.post("/e", function(req, res){
    module1();
  
});

app.post("/", function(req, res){
    module2();

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});