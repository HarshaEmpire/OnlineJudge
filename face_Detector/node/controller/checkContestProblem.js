







const fs=require("fs")
var request = require('request');
const {c, cpp, node, python, java} = require('compile-run');

const handleContestCheck=(req,res,db)=> {
	const id=req.body.p_id;
	const c_id=req.body.c_id;
	const c_name=req.body.c_name;
	const u_id=req.body.u_id;
	const difficulty=req.body.difficulty;

	let ans={p_id:id,c_id:c_id,p_name:"",question:"",input_form:"",output_form:"",sample_ip:"",sample_op:"",actual_ip:"",actual_op:""
	,tags:"",difficulty:difficulty};
	ans.actual_ip=fs.readFileSync(__dirname+`/${c_name}/${id}/actual_ip.txt`,'utf8');
	ans.actual_op=fs.readFileSync(__dirname+`/${c_name}/${id}/actual_op.txt`,'utf8');
	const sourcecode = req.body.data;
	let pp=0;
	return db.select("*").from("register").where('u_id','=',req.body.u_id).andWhere('c_id','=',req.body.c_id).then((data)=>{
			if(data.length===0)
					pp=1;
			return pp;
	})
	.then(async (dates)=>{
		let resultPromise;
		if(req.body.lang==='c')
			resultPromise = c.runSource(sourcecode,{ stdin:`${ans.actual_ip}` });
		else if(req.body.lang==='java')
			resultPromise = java.runSource(sourcecode,{ stdin:`${ans.actual_ip}` });
		else if(req.body.lang==='javascript')
			resultPromise = node.runSource(sourcecode,{ stdin:`${ans.actual_ip}` });
		else
			resultPromise = python.runSource(sourcecode,{ stdin:`${ans.actual_ip}` });
				
		resultPromise
	    .then(result => {
			if((result.stderr))
					res.json(result.errorType);
			else{
				kk=result.stdout.replace(/\r/g,"").split("\n");
				ll=ans.actual_op.replace(/\r/g,"").split("\n");
				console.log("t3",ll);
				console.log("t2",kk);
				var flag=0;
				if(ll.length !== kk.length)
					flag=1;
				else{
					for(var i=0;i<ll.length;i++){
						t1=ll[i].split(" ");
						t2=kk[i].split(" ");
						if(t1.length!=t2.length){
							flag=1;
							break;
						}
						for(var j=0;j<t1.length;j++){
							if(t1[j].localeCompare(t2[j])!=0){
								flag=1;
								break;
							}
						}
					}
				}
				
				if(req.body.mark===1 || pp===1){
					if(flag===0 ){
						db("correct").where("u_id","=",req.body.u_id)
						.andWhere("p_id","=",req.body.p_id).andWhere("c_id","=",c_id)
						.then((data)=>{if (data.length==0){db("correct").insert({u_id:req.body.u_id,p_id:req.body.p_id,c_id:req.body.c_id,score:0,c_name:req.body.c_name }).then(()=>{})}})
						.catch(err => res.json(err));

						db("submissions").insert({u_id:req.body.u_id,c_id:req.body.c_id,p_id:req.body.p_id,corr_status:1,score:0,c_name:req.body.c_name }).then(()=>{});
						res.json("correct answer");
					}
					else{
						db("submissions").insert({u_id:req.body.u_id,c_id:req.body.c_id,p_id:req.body.p_id,corr_status:0,score:0,c_name:req.body.c_name }).then(()=>{});
						res.json("wrong answer");
					}
				}
					else{
						if(flag===0){
							db("correct").where("u_id","=",req.body.u_id)
							.andWhere("p_id","=",req.body.p_id).andWhere("c_id","=",c_id)
							.then((data)=>{if (data.length==0){db("correct").insert({u_id:req.body.u_id,p_id:req.body.p_id,c_id:req.body.
								c_id,score:req.body.score,c_name:req.body.c_name }).then(()=>{})}})
							.catch(err => res.json(err));

							// db("submissions").insert({u_id:req.body.u_id,c_id:req.body.c_id,p_id:req.body.p_id,corr_status:1,score:0,c_name:req.body.c_name }).then(()=>{});
							res.json("correct answer");
						}
						else
							res.json("wrong answer");
					}
				}
		    	})
		    	.catch(err => {
		        	console.log(err);
		        	res.json(err);
		    	});

	})
	.catch(err=>{
		console.log("err");
		res.status(404).json("problem fetching problem");
	});
}



	module.exports = {
		handleContestCheck:handleContestCheck
	};









