import React from 'react';
import Card from '../problemCard/problemCard.js';
import Scroll from "../scroll/scroll";
import "./problems.css"
const Problems=({problems,userSolved,openProblem})=>{
	const comp=[]
	for(let i=0;i<problems.length;i++){
		if(userSolved.has(problems[i].id))
			comp.push(<Card key={problems[i].id} id={problems[i].id} name={problems[i].name} isAccepted={1} difficulty={problems[i].difficulty} problem={openProblem} />)
		else
			comp.push(<Card key={problems[i].id} id={problems[i].id} name={problems[i].name} isAccepted={0} difficulty={problems[i].difficulty} problem={openProblem} />)

	}
	return(
		<div >
			<legend className="f1 fw6 ph0 mh0 center">PROBLEM SET</legend>
			<Scroll style={{width:"90%"}}>
			<table  style={{width:"100%"}}>
				<tbody>
					<tr className="new bin " >
						<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
						<td  className="ba bw1 pointer" style={{width:"75%"}}>PROBLEM</td>
						<td className="ba bw1 " style={{width:"10%",whiteSpace:"pre-line"}}>DIFFICULTY</td>
						<td className="ba bw1" style={{width:"5%"}} >AC</td>
					</tr>
						{comp}
				</tbody>
			</table>
			</Scroll>
		</div>

	);
}
export default Problems;