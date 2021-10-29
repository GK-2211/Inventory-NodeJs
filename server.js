const express = require('express');
const app=express();
const port=process.env.port || 3000;

const db=require('./db');

const itemRouter=require('./routes/item')
const userRouter=require('./routes/users')
const invoiceRouter=require('./routes/invoice')
const billRouter=require('./routes/bill');
const login = require('./routes/login');

app.listen(port,function(){
    console.log("Sucessfully running");
})

app.use("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Content-Disposition", "application/binary");
    res.header("X-Frame-Options", "sameorigin");
    if (req.method == "OPTIONS") {
      res.send(200);
    } else {
      next();
    }
  });

app.use('/item',itemRouter);
app.use('/user',userRouter);
app.use('/invoice',invoiceRouter);
app.use('/bill',billRouter);
app.use('/login',login);