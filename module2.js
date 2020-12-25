//jshint esversion:6

function module2(){
  const express = require("express");
  const bodyParser = require("body-parser");
  const mongoose = require("mongoose");
  
  const app = express();
  
  app.set('view engine', 'ejs');
  
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static("public"));
  
  mongoose.connect("mongodb://localhost:27017/medicineDB", {useNewUrlParser: true, useUnifiedTopology: true});
  
  const itemSchema = {
    name: String,
    id: Number,
    price: Number,
    group: String,
    details: String,
    company: String,
    mDate: Number,
    eDate: Number,
    units: Number
  };
  
  const Item = mongoose.model("Item", itemSchema);
  
  const item1 = new Item({
    name: "Napa",
    id: 1,
    group: "Paracetamol",
    company: "Beximco Pharma",
    details: "500 mg",
    price: 0.80,
    mDate: 12.2019,
    eDate: 12.2021,
    units: 30
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
        res.render("m-list", {listTitle: "Medicine List", newListItems: foundItems});
      }
    })
  
  });
  
  const defaultItem = [item1];
  
  
  
  app.post("/", function(req, res){
  
    const itemName = req.body.newName;
    const itemId = req.body.newId;
    const itemGroup = req.body.newgroup;
    const itemCompany = req.body.newcompany;
    const itemDetails = req.body.newDetails;
    const itemPrice = req.body.newPrice;
    const itemMDate = req.body.newMdate;
    const itemEDate = req.body.newEdate;
    const itemUnits = req.body.newUnits;
  
    const item = new Item({
      name: itemName,
      id: itemId,
      group: itemGroup,
      company: itemCompany,
      details: itemDetails,
      price: itemPrice,
      mDate: itemMDate,
      eDate: itemEDate,
      units: itemUnits
  
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
        res.render("m-list", {listTitle: "Medicine List", newListItems: foundItems});
      }
    })
  });

  app.listen(3000, function() {
  console.log("Server started on port 3000");
});
  }
  
  module.exports = module2;