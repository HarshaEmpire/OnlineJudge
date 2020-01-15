






const handleSearch=(req,res,db)=> {
	var a=new Date();
	var bb=a.toISOString()
	// console.log(bb);
	var time=`${bb.substring(0,4)}-${bb.substring(5,7)}-${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
	var bbs=(req.query.tags.toLowerCase()).split(",");
	let flag=0;
	for( i=0;i<bbs.length;i++){
		if(bbs[i].localeCompare('all')===0)
			flag=1;
	}
	var sub=db.select('problemset.p_id','problemset.c_id').from("problemset").join('contests','problemset.c_id','=','contests.c_id')
	    .join('tags',function(){
	    	this
	    	.on('problemset.p_id','tags.p_id')
	    	.on('problemset.c_id','tags.c_id')
	    }).where("contests.date_con","<", time);
	if(flag===1){
		
	    return db.select("*").from("problemset").join('contests','problemset.c_id','=','contests.c_id')
	    .whereIn(['problemset.p_id','problemset.c_id'],sub)
		.then(problems => {
			res.json({prob:problems});
		}).catch(err => {
			res.status(404).json("problem fetching problem");
		});
	}
	var subs=db.select('problemset.p_id','problemset.c_id').from("problemset").join('contests','problemset.c_id','=','contests.c_id').
	join('tags',function(){
	    	this
	    	.on('problemset.p_id','tags.p_id')
	    	.on('problemset.c_id','tags.c_id')
	    }).where(
		"tags.tag","in",bbs
	).andWhere("contests.date_con","<", time);

	return db.select("*").from("problemset").join('contests','problemset.c_id','=','contests.c_id').
	whereIn(['problemset.p_id','problemset.c_id'],subs)
	.then(problems => {
		console.log(problems)
		res.json({prob:problems});
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleSearch:handleSearch
	};
