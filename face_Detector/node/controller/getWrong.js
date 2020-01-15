






const handleWrong=(req,res,db)=> {
	var a=new Date();
	var bb=a.toISOString()
	var time=`${bb.substring(0,4)}-${bb.substring(5,7)}-${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
	return db.distinct('submissions.c_id','submissions.p_id','submissions.c_name','problemset.p_name','problemset.difficulty')
	.from("submissions").join("problemset",function(){
	    	this
	    	.on('problemset.p_id','submissions.p_id')
	    	.on('problemset.c_id','submissions.c_id')
	    }).where(
		"submissions.u_id","=",req.query.u_id
	).andWhere("submissions.corr_status","=",0)
	.then(problems => {
		res.json({prob:problems});
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleWrong:handleWrong
	};
