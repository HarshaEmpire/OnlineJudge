import React, { Component } from 'react'
const Question=({name,question,input})=>{
	return(
		<div className="ma3">
			<legend className="f1 fw6 ph0 mh0 center">{name}</legend>
			<div style={{width:"90%"}}>
				<div style={{whiteSpace:"pre-line"}}>
					<legend className="f3 fw6 ph0 mh0 ">QUESTION</legend>
					{question}
				</div>
				<div>
					<legend className="f3 fw6 ph0 mh0 ">INPUT</legend>
					{input}
				</div>
			</div>		
		</div>
	)
}
export default Question;

