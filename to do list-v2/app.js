//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB")


const itemSchema = {
  name: String
}

const Item = mongoose.model("Item", itemSchema)


const item1 = new Item({
  name: "Welcome to your todolist!"
})

const item2 = new Item({
  name: "Hit the + button to add a new item."
})

const item3 = new Item({
  name: "<-- hit this to delete an item."
})


const defaultItems = [item1, item2, item3]

const listSchema={
  name:String,
  items:[itemSchema]
}

const List=mongoose.model("List",listSchema)

app.get("/", function (req, res) {

  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      })
      res.redirect("/")
    }else{
      res.render("list", { listTitle:"Today", newListItems: foundItems });
    }
  })

  
app.get("/:customListName",function(req,res){
  const customListName=req.params.customListName

  List.findOne({name:customListName},function(err,foundList){
    if(!err){
      if(!foundList){
        console.log("Doesn't exist")
        const list=new List({
          name:customListName,
          items:defaultItems
          
        })
        list.save()
        res.redirect("/" + customListName)
      }else{
        console.log("Exist")
        res.render("list",{listTitle:foundList.name, newListItems:foundList.items})
      }
    }
  })

  
})


});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
  }
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
