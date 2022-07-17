const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://harsh9539:Harsh9539@cluster0.egujj.mongodb.net/userApiDB", { useNewUrlParser: true })


// console.log(__dirname)
const userSchema = new mongoose.Schema({
    name:String,
    desc:String
});

const User = new mongoose.model("User",userSchema);

const user = new User({
    name:"Harsh Goyal",
    desc:"Software Engineer"
})


app.get('/home',function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get('/delete',function(req,res){
    res.sendFile(__dirname+"/delete.html");
})
app.get('/put',function(req,res){
    res.sendFile(__dirname+"/put.html");
})


app.get("/",function(req,res){
    User.find((err,foundItems)=>{
        if(!err){
            res.send(foundItems)
        }
        else{
            res.send(err);
        }
    })
});

app.post("/",function(req,res){
    const name = req.body.name;
    const desc = req.body.desc;
    const user = new User({
        name:name,
        desc:desc
    })
    user.save((err)=>{
        if(!err){
            res.send("successfully updated the article");
            // res.redirect("/home");
        }
        else{
            res.send(err)
        }
    })
    console.log(name,desc);
    // res.send("successful")
});

app.delete("/",(req,res)=>{
    // console.log(req.body);
    const user_id = req.body._id;
    User.findByIdAndRemove(user_id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Removed User : ", docs);
            res.send("Removed user: ")
        }
})
});
app.post("/delete",(req,res)=>{
    // console.log(req.body);
    const user_id = req.body._id;
    User.findByIdAndRemove(user_id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Removed User : ", docs);
            res.send("Removed user: ")
        }
})
});
app.put("/",(req,res)=>{
    const name = req.body.name;
    const desc = req.body.desc;
    const user_id =req.body._id;
    User.findById(user_id,(err,found)=>{
        console.log(found);
    User.updateOne({_id:user_id},{name:name,desc:desc},function(err){
        if(!err){
            res.send("Successfully updated the article");
        }
    })
})
});
app.post("/put",(req,res)=>{
    const name = req.body.name;
    const desc = req.body.desc;
    const user_id =req.body._id;
    User.findById(user_id,(err,found)=>{
        console.log(found);
    User.updateOne({_id:user_id},{name:name,desc:desc},function(err){
        if(!err){
            res.send("Successfully updated the article");
        }
    })
})
});
app.patch("/",(req,res)=>{
    const user_id =req.body._id;
    User.findById(user_id,(err,found)=>{
        console.log(found);
        console.log("fjalsdfjka\n");
        console.log(req.body);
    User.updateOne({_id:user_id},{$set:req.body},function(err){
        if(!err){
            res.send("Successfully patch");
        }
    })
})
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log("Server is responding correctly on "+ PORT);
})