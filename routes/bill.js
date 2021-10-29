const express=require ('express');
const router=express.Router();
const bodyParser=require('body-parser')
const db=require('../db');

router.use(bodyParser.json({urlencoded:true}));

router.post("/",function(req,res,next){
    var jsondata=req.body
    var values =[];
    //console.log(data)
    for(var i=0; i< jsondata.length; i++)
    
         values.push([jsondata[i].serial_no,jsondata[i].itemnumber,jsondata[i].itemname,jsondata[i].itemquantity,jsondata[i].itemprice,jsondata[i].itemsubtotal,jsondata[i].invoice_no]);
    var sql="INSERT INTO bill (serial_no,itemnumber,itemname,itemquantity,itemprice,itemsubtotal,invoice_no) VALUES ?";
    db.query(sql,[values],function(err,result){
        if (err){
            throw err;
        }
        else
        {
          console.log(result);
          
        }
    })
})


router.get('/:id', function (req, res, next) {
    const id = req.params.id;
     var sql = "SELECT * FROM bill WHERE invoice_no=?";
    
    db.query(sql,[id],function (err,row,fields) {
        if (err) {
            throw err;
        }
        else{
        res.json(row)
        }
    })
  })
module.exports=router;

