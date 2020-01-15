

const handleCheck=(req,res,db)=> {

	return db.select("*").from("users").where('email','=',req.body.email)
	.then((user) => {
		console.log("yhis",user);
		res.json(user);
	}).catch(err => {
		res.status(404).json("problem fetching problem");
	});
	
}

	module.exports = {
		handleCheck:handleCheck
	};
