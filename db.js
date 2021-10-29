const mysql=require('mysql');

const con=mysql.createConnection({
    host : "103.108.220.123",
    user: "xksizapa_Garima",
    password : "Garima@123",
    database : "xksizapa_Inventory"
});

con.connect(function(err){
   if (err){
       throw err;
   }
   console.log("Connected");
})

module.exports=con;  