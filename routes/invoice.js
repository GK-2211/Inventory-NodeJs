const express=require ('express');
const router=express.Router();
const bodyParser=require('body-parser')
const db=require('../db');

router.use(bodyParser.json({urlencoded:true}));





router.post("/",function(req,res,next){
    const {total,gst,grandtotal,customer_name}=req.body;
    var sql="INSERT INTO invoice(total,gst,grand_total,customer_name) VALUES (?,?,?,?)";
    db.query(sql,[total,gst,grandtotal,customer_name],function(err,result){
        if (err){
            throw err;
        }
        else {
          res.json(result);
        }
    }   
    )
})

router.put('/update/:id', function(req, res, next) {
    var id = req.params.id;
    const {total,gst,grandtotal,customer_name}=req.body;
     var sql = "UPDATE invoice SET total=?,gst=?,grand_total=?,customer_name=? WHERE invoice_no=?";
    db.query(sql,[total,gst,grandtotal,customer_name,id],function(err, result) {
      if(err) {
        throw err;
      }
      else{
      res.json(result);
      }
    })
  });

  router.get("/",function(req,res,next){
    var sql="SELECT * from invoice"
      db.query(sql,function(err,rows,fields){
        if (err)
        throw err;
        else{
        res.json(rows);
        console.log(fields)
        }
    })
})

router.get('/:id',function(req,res){
  var id=req.params.id;
  console.log(id);
  var sql="SELECT * from invoice where invoice_no=?"
  db.query(sql,[id],function(err,row){
    if (err)
     throw err;
     else{
     res.json(row);
     console.log(row)
     }
  })
})

module.exports=router;
