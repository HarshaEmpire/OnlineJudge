var fs=require('fs');
const handleMakeContest = (req,res,db)=>{
		const {name,number,start,end}=req.body;
		var tt=[]
		var tags=[]

		db.transaction(trx => {
			db("contests").transacting(trx).insert({
				c_name:name,
				date_con:end,
				date_start:start
				
			}).
			returning('c_id').
			then(id=>{
				for(let i=0;i<number;i++){
					var aa=__dirname+`/${name}/${i}/`+'p_name'+".txt"
					var bb=__dirname+`/${name}/${i}/`+'tags'+".txt"
					var kk=fs.readFileSync(aa).toString()
					var k2=fs.readFileSync(bb).toString().split()
					for(let j=0;j<k2.length;j++){
						tags.push({c_id:id[0],p_id:i,tag:k2[j]})
					}
					// console.log(kk)
					tt.push({c_name:name,c_id:id[0],p_id:i,p_name:kk,difficulty:2400})

				}
				console.log(tt);	
				return id;			
			}).
			then(id =>{

				return trx('problemset')
				.returning("*")
				.insert(tt)
				
			})
			.then(rest => {
				return trx('tags')
				.returning('*')
				.insert(tags)
				.then(all=>{
					res.json("hy");
				})
			})
			.then(trx.commit)
			.catch(trx.rollback);
		})
		.catch(err => {
			console.log(err);
			res.status(400).json("error")});
		
	}
	module.exports = {
		handleMakeContest:handleMakeContest
	};