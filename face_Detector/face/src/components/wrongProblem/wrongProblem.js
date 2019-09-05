import React from 'react';
import WrongCard from '../wrongCard/wrongCard.js';
import "./wrongProblem.css"
const WrongProblem=({problems,openProblem})=>{
	const comp=[]
	for(let i=0;i<problems.length;i++){
			comp.push(<WrongCard key={problems[i].id} id={problems[i].id} name={problems[i].name} problem={openProblem} />)
	}
	return(
		<div >
			<legend className="f1 fw6 ph0 mh0 center">WRONG SUBMISSION</legend>
			<table  style={{width:"90%"}}>
				<tbody>
					<tr className="new bin">
						<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
						<td  className="ba bw1 pointer" style={{width:"90%"}}>PROBLEM</td>
					</tr>
					{comp}
				</tbody>
			</table>
		</div>

	);
}
export default WrongProblem;