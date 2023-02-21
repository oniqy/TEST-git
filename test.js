const port = 3001
//var sql = require("mssql");
var sql = require("mssql/msnodesqlv8");
var express = require('express');
const moment = require('moment/moment');
var app = express()
var fs = require('fs');
const path = require('path')
var sever = app.listen(port,function(){
    console.log("sever is running:")
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.get('/index',(req,res,next)=>{
  var ddan = path.join(__dirname,'index.HTML')
  res.sendFile(__dirname+"/index.html");
});
app.use('/css',express.static(path.join(__dirname,'/css')));
app.use('/images',express.static(path.join(__dirname,'/images')));
app.use('/js',express.static(path.join(__dirname,'/js')));

app.get('/getAllProduct', function (req, res) {
    // config for your database
   var config = {
       user: 'sa',
       password: '123456',
       server: 'DESKTOP-D99T0PS\\THAIVY',
       database: 'QlTraSua2',
       options: {
           encrypt: false,
           trustedConnection: true,
       },
       driver: "msnodesqlv8"
   };
   // connect to your database
   sql.connect(config, function (err, db) {
       if (err) console.log(err);
       // create Request object
       var request = new sql.Request();
       // query to the database and get the records
       request.query('select * from sanPham', function (err, recordset) {
           if (err) console.log(err)
           res.send(recordset.recordsets[0]);
       });
   });
});