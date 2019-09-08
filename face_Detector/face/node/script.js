// const express=require("express");
// const bodyParser = require("body-parser");

// const app=express();


// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
// app.use(express.static(__dirname+'/'))

// app.get("/:id/:name",(req,res)=>{
// 	console.log(req.params);
// 	res.status("404").send("cv");
// });



// app.listen(3000);
const fs=require('fs')

fs.readFile('./tree.txt',(err,data) => {
	if(err){
		console.log("errrrr");
	}
	console.log(data.toString('ASCII'));
})

const file=fs.readFileSync("./tree.txt");
console.log("2",file.toString());

// fs.appendFile("./tree.txt"," cooleeeeeer",err=>{
// 	if(err){
// 		console.log()
// 	}
// })

// fs.writeFile("bye.txt","sad to go",(err)=>{
// 	if(err)
// 		console.log(err);
// })

fs.unlink("bye.txt",err => {
	if(err)
		console.log(err);
})