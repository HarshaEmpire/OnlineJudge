import React, { Component } from 'react'
import "./wrongCard.css"

const WrongCard=(props)=>{
	const {id,name,problem,c_id,c_name,difficulty}=props;
	return(

		<tr className="new">
			<td className="ba bw1 center" style={{width:"10%",fontSize:"0.7em"}}>{id}</td>
			<td  className="ba bw1 pointer" style={{width:"90%",fontSize:"0.7em"}} onClick={()=>problem(id,c_id,c_name,difficulty)}>
				{name}</td>
		</tr>

	);

}
export default WrongCard;