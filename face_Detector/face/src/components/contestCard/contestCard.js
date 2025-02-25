import React, { Component } from 'react'
import "./contestCard.css"

const ContestCard=(props)=>{
	const {id,name,start,end,problem}=props;
	return(

		<tr className="new">
			<td className="ba bw1 center" style={{width:"10%"}}>{id}</td>
			<td  className="ba bw1 pointer" style={{width:"50%"}} onClick={()=>problem(id)}>
				{name}
			</td>
			<td className="ba bw1" style={{width:"20%"}} >{start}</td>
			<td className="ba bw1" style={{width:"20%"}} >{end}</td>
		</tr>

	);

}
export default ContestCard;