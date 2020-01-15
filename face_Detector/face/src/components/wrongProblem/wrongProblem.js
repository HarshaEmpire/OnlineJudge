import React from 'react';
import WrongCard from '../wrongCard/wrongCard.js';
import "./wrongProblem.css"
const WrongProblem=({problems,openProblem,userSolved})=>{
	const comp=[]
	console.log("11",userSolved,problems)
	for(let i=0;i<problems.length;i++){
			if(!(userSolved.has(JSON.stringify({'p_id':problems[i].p_id,'c_id':problems[i].c_id}))))
				comp.push(<WrongCard key={i} id={problems[i].p_id} c_id={problems[i].c_id} 
					difficulty={problems[i].difficulty} c_name={problems[i].c_name} name={problems[i].p_name} problem={openProblem} />)
	}
	return(
		<div >
			<legend className="f4 fw6 ph0 mh0 center">WRONG SUBMISSION</legend>
			<table  style={{width:"90%"}}>
				<tbody>
					<tr className="new ">
						<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
						<td  className="ba bw1 pointer" style={{width:"90%"}}>PROBLEM</td>
					</tr>
				</tbody>
				<tbody style={{overflowY:"scroll",maxHeight:"100px"}} >
					{comp}
				</tbody>
				
			</table>
		</div>

	);
}
export default WrongProblem;