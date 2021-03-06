const express = require('express')
const userRoutes = require('./routes/users')
const bookRoutes = require('./routes/books')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');

const app = express();
//allow headers and methods
app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methons','OPTIONS, GET, POST, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
next();
});
//example of token : 'Bearer sdkfjslkjflsdjfl' 

//add routes
app.use(bodyParser.json());

//image upload
app.use('/images',express.static(path.join(__dirname,'images')))

app.use('/user',userRoutes);
app.use('/book',bookRoutes);
//error route
app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message,data:data});
});

mongoose.connect('mongodb+srv://sharp2:dnw0fx60ldLKCgu2@cluster0.o5no6.mongodb.net/?retryWrites=true&w=majority').then(result=>{
    app.listen( process.env.PORT || 8080); 
    console.log('done server running');
}).catch(err=>console.log(err)); 