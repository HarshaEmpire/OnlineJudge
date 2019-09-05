const express=require("express");
const app=express();
const bcrypt=require("bcrypt-nodejs");
const bodyParser=require("body-parser");
const cors=require("cors");
app.use(bodyParser.json());
app.use(cors())
const knex=require('knex')
const register=require('./controller/register');
const signin=require("./controller/signin")
const profile=require("./controller/profile");
const image=require("./controller/image");
const deletes=require("./controller/deletes");

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'user',
    database : 'smart'
  }
});

var request = require('request');
dbs={input:"4 5\n6 7\n8 9",output:"9\n13\n17\n",memory:"3000",time:"1.000"}

app.post('/contest',(req,res)=>{

			var program = {
			    script : req.body.data,
			    language: "c",
			    stdin: dbs.input,
			    versionIndex: "2",
			    clientId: "a26ca9ba3ad8fc0ef80f5d8af46474fb",
			    clientSecret:"46bb08d823ab64d0c0c738bf49ebd5f3da8575a3c43365680ee61bc5402e6001"
			};
			request({
			    url: 'https://api.jdoodle.com/v1/execute',
			    method: "POST",
			    json: program
			},
			function (error, response, body) {
				if(error)
					res.send("some error occured");
				else{
					kk=body.output.split("\n");
					ll=dbs.output.split("\n");
					var flag=0;
					for(var i=0;i<ll.length();i++){
						t1=ll[i].split(" ");
						t2=kk[i].split(" ");
						if(t1.length()!=t2.length()){
							flag=1;
							break;
						}
						for(var j=0;j<t1.length();j++){
							if(t1[j].localeCompare(t2[j])!=0){
								flag=1;
								break;
							}
						}
					}
					if(flag===0 && parseInt(dbs.memory)<parseInt(body.memory) && parseFloat(dbs.time)>parseFloat(body.cpuTime))
						res.send("correct answer");
					else
						res.send("wrong answer");
				}
			});
})


app.get('/',(req,res)=>{
	res.json(db.user);
});

app.post('/delete',(req,res)=>{deletes.deleteHandler(req,res,db)})
app.post('/signin',(req,res)=>{signin.signinHandler(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put("/image",(req,res)=>{image.handleImage(req,res,db)})
app.post("/imageurl",(req,res) => {image.handleApiCall(req,res)})

app.listen(3000,()=>{
	console.log("running port 30000");
});
