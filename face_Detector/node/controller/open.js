var fs=require("fs")
const handleOpen=(req,res)=>{
	let aa=__dirname+'/'+req.query.name
	fs.mkdirSync(aa)
	res.json("done");
}

	module.exports = {
		handleOpen:handleOpen
	};