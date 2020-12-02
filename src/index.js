import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
import express from 'express';
import expressGraphql from 'express-graphql';
//import Schema from './schema/Schema.js';
import mongoose from 'mongoose';
import cors from 'cors';

import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';





//librerias file upload

var bodyParser = require('body-parser');
var multer =  require('multer');
var path = require('path');


const {graphqlHTTP} = expressGraphql;

const port = 5000;

//const __dirn//fileupload
//const __dirname = path.resolve(path.dirname(''));

var picModel = mongoose.model('picsdemo',picSchema);

var picSchema= new mongoose.Schema({
    picpath:String
})


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
var upload = multer({storage:storage})


//fileupload

const app= express();

app.use(cors());

const dbName = 'games-db';
const user = 'admin';
const password = '1234';
const connectionString = `mongodb+srv://${user}:${password}@clustergames.x6nub.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(console.log('connected to games-db'))
.catch(error => console.log(`[Error]: ${error}` ));


app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true

}));


//fileupload
app.set('views',path.resolve(__dirname,'views'));
app.set('view engine','ejs');



app.set('views', __dirname + './src/Components');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

var pathh = path.resolve(__dirname,'public');
app.use(express.static(pathh));
app.use(bodyParser.urlencoded({extended:false}));


app.get('/',(req,res)=>{
    picModel.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('UploadFiles',{data:data})
        }
        else{
            res.render('UploadFiles',{data:{}})
        }
    })
})

app.post('/',upload.single('pic'),(req,res)=>{
    var x = 'uploads/'+req.file.originalname;
    var temp = new picModel({
        picpath:x
    })
    temp.save((err,data)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.get('/download/:id',(req,res)=>{
    picModel.find({_id:req.params.id},(err,data)=>{
         if(err){
             console.log(err)
         }
         else{
             var x= __dirname+'/public/'+data[0].picpath;
             res.download(x)
         }
    })
})
//fileupload



*/