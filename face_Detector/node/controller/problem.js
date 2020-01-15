
var fs=require('fs');

const handleProblem=(req,res,db)=> {
	const id=req.query.id;
	const c_id=req.query.c_id;
	const c_name=req.query.c_name;
	const difficulty=req.query.difficulty;
	let ans={p_id:id,c_id:c_id,c_name:c_name,p_name:"",question:"",input_form:"",output_form:"",sample_ip:"",sample_op:"",actual_ip:"",actual_op:""
	,tags:"",difficulty:difficulty};
	ans.p_name=fs.readFileSync(__dirname+`/${c_name}/${id}/p_name.txt`,'utf8');
	ans.question=fs.readFileSync(__dirname+`/${c_name}/${id}/question.txt`,'utf8');
	ans.input_form=fs.readFileSync(__dirname+`/${c_name}/${id}/input.txt`,'utf8');
	ans.output_form=fs.readFileSync(__dirname+`/${c_name}/${id}/output.txt`,'utf8');
	ans.sample_ip=fs.readFileSync(__dirname+`/${c_name}/${id}/sample_ip.txt`,'utf8');
	ans.sample_op=fs.readFileSync(__dirname+`/${c_name}/${id}/sample_op.txt`,'utf8');
	ans.tags=fs.readFileSync(__dirname+`/${c_name}/${id}/tags.txt`,'utf8');
	ans.actual_ip=fs.readFileSync(__dirname+`/${c_name}/${id}/actual_ip.txt`,'utf8');
	ans.actual_op=fs.readFileSync(__dirname+`/${c_name}/${id}/actual_op.txt`,'utf8');

	// return db.select("*").from("problemset").where({
	// 	p_id:id})
	// .then(problem => {
	// 	ans.p_id=id;
	// 	ans.c_id=problem[0].c_id;
	// 	ans.difficulty=problem[0].difficulty;
	// 	// console.log(problem);
	// 	// console.log(ans);
	// 	res.json({prob:[ans]});
	// }).catch(err => {
	// 	res.status(404).json("problem fetching problem");
	// });
	res.json({prob:[ans]});
	
}

	module.exports = {
		handleProblem:handleProblem
	};
