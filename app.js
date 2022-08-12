const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("list", {listTitle: date.getDate(), newListItems: items});
});

app.post("/", function(req, res) {
  if (req.body.newItem != "") {
    if (req.body.list === "work") {
      workItems.push(req.body.newItem);
      res.redirect("/work");
    } else {
      items.push(req.body.newItem);
      res.redirect("/");
    }
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function(){
  console.log("Server started on port 3000!");
});
