const express=require ('express');
const router=express.Router();
const bodyParser=require('body-parser')
const db=require('../db');

router.use(bodyParser.json({urlencoded:true}));

router.get('/:email', function (req, res, next) {
    const emailget=req.params.email;
    var sql = "SELECT * FROM users WHERE email=?";
    console.log(emailget);
    db.query(sql,[emailget],function (err,row,fields) {
        if (err) {
            throw err
        }
        else{
          res.json(row);
        }
    })
  })





module.exports=router;