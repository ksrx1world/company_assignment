const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app= express();

//For 
const port= process.env.PORT;
const uri= process.env.ATLAS_URI; 

//use of cors and express in node
app.use(cors());
app.use(express.json());


//moongose connection to mlab or atlas
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', (err) => {
    if(!err) {console.log("database connection is established");}
    else
    console.log(`connection error+${err}`)
});  

//Routes
const userrouter= require('./routes/user') 
app.use("/api/v1", userrouter);

const sessionrouter= require('./routes/session')
app.use("/api/v1", sessionrouter);

//listen to which port with callback confirmation
app.listen(port, () => {
    console.log('Server listening at url http://localhost:'+ port);
})
