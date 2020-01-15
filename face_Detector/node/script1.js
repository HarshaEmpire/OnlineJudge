const express=require("express");
const app=express();
const bcrypt=require("bcrypt-nodejs");
const bodyParser=require("body-parser");
const cors=require("cors");
app.use(bodyParser.json());
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
const signingoogle=require("./controller/signingoogle")
const knex=require('knex')
const register=require('./controller/register');
const signin=require("./controller/signin")
const profile=require("./controller/profile");
const image=require("./controller/image");
const deletes=require("./controller/deletes");
const problem=require("./controller/problem");
const allProblem=require("./controller/allProblem")
const searchProblem=require("./controller/searchProblem")
const checkProblem=require("./controller/checkProblem")
const getContest=require("./controller/getContest")
const getWrong=require("./controller/getWrong")
const getRight=require("./controller/getRight")
const getAllContests=require("./controller/getAllContests")
const getContestInfo=require("./controller/getContestInfo")
const getContestproblem=require("./controller/getContestproblem")
const getTime=require("./controller/getTime")
const checkContestProblem=require("./controller/checkContestProblem")
const getRegister=require("./controller/getRegister")
const getScore=require("./controller/getScore")
const getChart=require("./controller/getChart")
const getData=require("./controller/getData")
const setData=require("./controller/setData")
const registerContest=require("./controller/registerContest")
const checkUser=require("./controller/checkUser")
const getAnswer=require("./controller/getAnswer")

const upload = require('./controller/upload')
const open=require('./controller/open')
const makeContest=require('./controller/makeContest')






const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'user',
    database : 'oj'
  }
});

var request = require('request');
setInterval(function(){

		let a=new Date();
		let bb=a.toISOString()
		let time=`${bb.substring(0,4)}/${bb.substring(5,7)}/${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
		db.select("*").from('server').then((last_Modifieds)=>{
		let last_Modified=last_Modifieds[0].last_modified;
		db.select("*").from("register").join('contests','contests.c_id','=','register.c_id')
		.where('contests.date_start','>',last_Modified)
		.andWhere('contests.date_con','<',time)
		.then((data)=>{
			let temp=new Set();
			for(let i=0;i<data.length;i++){
				temp.add(data[i].c_id);
			}
			console.log(temp)
			for(let i of temp){
				console.log(i)
				db.select('correct.u_id').sum('score as a1').from("correct").join("register",'correct.u_id','=','register.u_id')
				.whereRaw("correct.c_id = register.c_id")
				.andWhere("correct.c_id",'=',i)
				.groupBy('correct.u_id').orderBy('a1','desc')
				.then((datas)=>{
					for(let j=0;j<datas.length;j++){
						let change=datas.length-j;
						db('users').where('u_id','=',datas[j].u_id)
						.increment('rating',change).then(()=>{})
					}
					console.log(data)})
			}
			db('server').update({last_modified:time}).then((dat)=>{console.log(dat)});
			
		})
		.catch(err=>console.log(err))
	})
},300000000);







app.get('/',(req,res)=>{
	res.json(db.user);
});
let i=0;
app.post('/delete',(req,res)=>{deletes.deleteHandler(req,res,db)})
app.post('/signin',(req,res)=>{signin.signinHandler(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put("/image",(req,res)=>{image.handleImage(req,res,db)})
app.post("/imageurl",(req,res) => {image.handleApiCall(req,res)})
app.get("/getProblem",(req,res)=>{problem.handleProblem(req,res,db)})
app.get("/getAProblems",(req,res)=>{allProblem.handleAll(req,res,db)})
app.get("/getSearch",(req,res)=>{searchProblem.handleSearch(req,res,db)})
app.post("/checkProblem",(req,res)=>{checkProblem.handleCheck(req,res,db)})
app.get("/getContest",(req,res)=>{getContest.handleGet(req,res,db)})
app.get("/getWrong",(req,res)=>{getWrong.handleWrong(req,res,db)})
app.get("/getRight",(req,res)=>{getRight.handleRight(req,res,db)})
app.get("/getAllContests",(req,res)=>{getAllContests.handleAllContests(req,res,db)})
app.get("/getContestInfo",(req,res)=>{getContestInfo.handleContestInfo(req,res,db)})
app.get("/getContestproblem",(req,res)=>{getContestproblem.handleContestProblem(req,res,db)})
app.post("/checkContestProblem",(req,res)=>{checkContestProblem.handleContestCheck(req,res,db)})
app.get("/getTime",(req,res)=>{getTime.handleTime(req,res,db)})
app.get("/getRegister",(req,res)=>{getRegister.handleRegister(req,res,db)})
app.get("/getScore",(req,res)=>{getScore.handleScore(req,res,db)})
app.get("/getChart",(req,res)=>{getChart.handleChart(req,res,db)})
app.get("/getData",(req,res)=>{getData.handleGet(req,res,db)})
app.post("/setData",(req,res)=>{setData.handleSet(req,res,db)})
app.get("/registerContest",(req,res)=>{registerContest.handleRegister(req,res,db)})
app.post("/signingoogle",(req,res)=>{signingoogle.signinHandler(req,res,db,bcrypt)})
app.post("/checkUser",(req,res)=>{checkUser.handleCheck(req,res,db)})
app.post("/getAnswer",(req,res)=>{getAnswer.handleGet(req,res,db)})
app.post('/upload', (req,res)=>{upload.handleUpload(req,res)})
app.get('/open',(req,res)=>{open.handleOpen(req,res)})
app.post('/makeContest',(req,res)=>{makeContest.handleMakeContest(req,res,db)})
app.listen(3001,()=>{
	console.log("running port 3001");
});
