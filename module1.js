//jshint esversion:6

function module1(){
  const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/employeeDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = {
  name: String,
  id: Number,
  salery: Number,
  address: String,
  sex: String,
  position: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Mumu Kareem",
  id: 1,
  position: "Admin",
  sex: "Female",
  address: "Khulna"

});

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems){
    if(foundItems.length === 0){
      Item.insertMany(defaultItem, function(err){
      if(err){
        console.log("err");
      }else{
        console.log("Successfull..!!");
      }
});
res.redirect("/");
    }else{
      res.render("e-list", {listTitle: "Employee List", newListItems: foundItems});
    }
  })

});

const defaultItem = [item1];



app.post("/", function(req, res){

  const itemName = req.body.newName;
  const itemId = req.body.newId;
  const itemAddress = req.body.newAddress;
  const itemSex = req.body.newSex;
  const itemPosition = req.body.newPosition;
  const itemSalery = req.body.newSalery;

  const item = new Item({
    name: itemName,
    id: itemId,
    address: itemAddress,
    sex: itemSex,
    position: itemPosition,
    salery: itemSalery

  });
  item.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully Deleted Item.");
      res.redirect("/");
    }else{
      res.render("e-list", {listTitle: "Employee List", newListItems: foundItems});
    }
  })
});


}

module.exports = module1;