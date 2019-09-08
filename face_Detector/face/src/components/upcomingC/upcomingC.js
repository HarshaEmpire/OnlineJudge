import React from 'react';
import UpcomingCCard from '../upcomingCCard/upcomingCCard.js';
import Scroll from "../scroll/scroll";
import "./upcomingC.css"
const UpcomingC=({contests,problem})=>{
	const comp=[]
	for(let i=0;i<contests.length;i++){
		comp.push(<UpcomingCCard key={contests[i].id} id={contests[i].id} name={contests[i].name} start={contests[i].start} problem={problem} end={contests[i].end} />)
	}
	return(
		<div >
			<legend className="f1 fw6 ph0 mh0 center">UPCOMING CONTEST</legend>
			<table  style={{width:"90%"}}>
				<tbody>
					<tr className="new bin">
						<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
						<td  className="ba bw1 pointer" style={{width:"50%"}}>NAME</td>
						<td  className="ba bw1 pointer" style={{width:"20%"}}>START</td>
						<td  className="ba bw1 pointer" style={{width:"20%"}}>END</td>
					</tr>
					{comp}
				</tbody>
			</table>
		</div>

	);
}
export default UpcomingC;