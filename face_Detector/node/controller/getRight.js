






const handleRight=(req,res,db)=> {
	var a=new Date();
	var bb=a.toISOString()
	var time=`${bb.substring(0,4)}-${bb.substring(5,7)}-${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
	return db.select('correct.p_id','correct.c_id').from("correct").where(
		"correct.u_id","=",req.query.u_id
	)
	.then(problems => {
		res.json(problems);
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleRight:handleRight
	};
