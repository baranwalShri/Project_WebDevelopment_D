const express = require("express");
const { fstat } = require("fs");
const path = require("path");
const fs = require("fs");   
const app = express();
// getting-started.js
const mongoose = require('mongoose');
// const bodyparser = require("body-parser");

mongoose.set('strictQuery', false);


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/contactDance');
//}
const port = 8000;


//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    location: String,
    activity: String 
  });

  var trainerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    field: String,
    location: String,
    detail: String 
  });

  var Contact = mongoose.model('Contact', contactSchema);
  var Trainer = mongoose.model('Trainer', trainerSchema);


  Contact.find(function(err,kittens) {
    if (err) return console.error(err);
    console.log(kittens)
});

//Express SPECIFIC STUFF
app.use('/static',express.static('static')) 
app.use(express.urlencoded())            

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

//          ENDPOINTS
app.get("/",(req,res)=>{
    const params = {}
     res.status(200).render('index.pug',params); 
    //  res.status(200).render('home.pug',params);   
 });

 app.get("/contact",(req,res)=>{
    const params = {}   
     res.status(200).render('contact.pug',params);
 });
 app.get("/trainer",(req,res)=>{
    const params = {}   
     res.status(200).render('trainer.pug',params);
 });
 app.get("/feature",(req,res)=>{
    const params = {}   
     res.status(200).render('feature.pug',params);
 });
//  app.post("/contact",(req,res)=>{
//      name = req.body.name 
//      phone = req.body.phone
//      email = req.body.email
//      form = req.body.form
//      location = req.body.location
//      let outputToWrite =`The name of the client is: ${name},Phone no: ${phone},Email: ${email} , and him/her dance form: ${form}. Residing at: ${location}`
//      fs.writeFileSync('output1.txt',outputToWrite)
//                                                //  console.log(req.body)
//     const params = {'message':'Your form has been submitted succefully'}
//      res.status(200).render('contact.pug',params);
//  });
app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() => {
        // alert("Congrates for registration") 
        // res.alert("shreyaa")
        res.send("NOW YOU ARE REGISTERD IN MAGIC ACADEMY")
    }).catch(() =>{
        res.status(400).send("Students details was not saved to the database") 
        // alert("Oops! Something went wrong.")
        
    });
    // res.status(200).render('contact.pug');
})
app.post('/trainer',(req, res)=>{
    var Data = new Trainer(req.body);
    Data.save().then(() => {
        res.send("NOW YOU ARE REGISTERD AS A TRAINER IN MAGIC ACADEMY")
    }).catch(() =>{
        res.status(400).send("Trainer details was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})

 //        START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
});