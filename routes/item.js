const express=require ('express');
const router=express.Router();
const bodyParser=require('body-parser')
const db=require('../db');

router.use(bodyParser.json({urlencoded:true}));

router.get("/",function(req,res,next){
    var sql="SELECT * FROM items";
    db.query(sql,function(err,rows,fields){
        if (err)
        throw err;
        else{
        res.json(rows);
        console.log(fields)
        }
    })
})



router.post("/",function(req,res,next){
    const {itemname,price,quantity}=req.body;
    var sql="INSERT INTO items(itemname,price,quantity) VALUES (?,?,?)";
    db.query(sql,[itemname,price,quantity],function(err,result){
        if (err){
            throw err;
        }
        else {
          res.json({"status" : "success"});
        }
    }   
    )
})

router.delete('/delete/:id', function (req, res, next) {
    const id = req.params.id;
    var sql = "DELETE FROM items WHERE Id=?";
    console.log(id);
    db.query(sql,[id],function (err, result) {
        if (err) {
            throw err;
        }
        else{
        res.json({ 'status': 'success' })
        }
    })
})

router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  const {itemname,price,quantity}=req.body;
   var sql = "UPDATE items SET itemname=?,price=?,quantity=? WHERE id=?";
  db.query(sql,[itemname,price,quantity,id],function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    else{
    res.json({'status': 'success'})
    }
  })
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const itemname = req.params.id;
  
  var sql = "SELECT * FROM items WHERE itemname=? OR Id=?";
  console.log(id);
  db.query(sql,[itemname,id],function (err,row,fields) {
      if (err) {
          throw err;
      }
      else{
      res.json(row)
      }
  })
})


module.exports=router;

