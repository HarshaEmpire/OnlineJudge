



var fs=require('fs');


var request = require('request');
const {c, cpp, node, python, java} = require('compile-run');

const handleGet=(req,res,db)=> {
	const id=req.body.p_id;
	const sourcecode = req.body.data;
	const input=req.body.input;
	console.log(req.body.data);

	let resultPromise;
	if(req.body.lang==='c')
		resultPromise = c.runSource(sourcecode,{ stdin:`${input}` });
	else if(req.body.lang==='java')
		resultPromise = java.runSource(sourcecode,{ stdin:`${input}` });
	else if(req.body.lang==='javascript')
		resultPromise = javascript.runSource(sourcecode,{ stdin:`${input}` });
	else
		resultPromise = python.runSource(sourcecode,{ stdin:`${input}` });
	resultPromise
	.then(result => {
		console.log(result);
		if((result.stderr))
			res.json(result.errorType);
		else{
					// console.log("today",result.stdout)
					// console.log("today2",probs.actual_op)
			// kk=result.stdout.replace(/\r/g,"").split("\n");
			res.json(result.stdout);
		}


	})
	.catch(err=>{
		console.log("err");
		res.status(404).json("please try again");
	});
}



	module.exports = {
		handleGet:handleGet
	};
