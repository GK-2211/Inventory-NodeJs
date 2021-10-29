const express=require ('express');
const router=express.Router();
const bodyParser=require('body-parser')
const db=require('../db');

router.use(bodyParser.json());

router.get("/",function(req,res,next){
    var sql="SELECT * FROM users";
    db.query(sql,function(err,rows,fields){
        if (err)
        throw err;
        else{
        res.json(rows);
        console.log(fields);
        }
    })
})



router.post("/",function(req,res,next){
    const {email,businessname,password,phonenumber,address}=req.body;
    var sql="INSERT INTO items(email,businessname,password,phonenumber,address) VALUES (?,?,?,?.?)";
    db.query(sql,[email,businessname,password,phonenumber,address],function(err,result){
        if (err){
            throw err;
        }
        else{
            res.json({"Status" : "Success"});
        }
    }   
    )
})

router.get('/:email', function(req, res, next) {
    const email = req.params.email;
    var sql = `SELECT * FROM users WHERE email=?`;
    db.query(sql,[email],function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }else{
      res.json(row);  }
    })
  });


  router.put('/update/:email', function(req, res, next) {
    const email = req.params.email;
    console.log(email);
    const {businessname,phonenumber,address}=req.body;
     var sql = "UPDATE users SET businessname=?,phonenumber=?,address=? WHERE email=?";
    db.query(sql,[businessname,phonenumber,address,email],function(err, result) {
      if(err) {
        throw err;
      }
      else{
      res.json(res)
      }
    })
  });
module.exports=router;

