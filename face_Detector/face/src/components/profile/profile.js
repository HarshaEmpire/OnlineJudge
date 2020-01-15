import React, { Component } from 'react'
import "./profile.css"
const Profile=({handle,rating,name,email,institution,styles,pic})=>{
	let imgs="data:image/jpeg;base64,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"
	if((pic))
		imgs=pic;
	return (
		<div className="pv5">
			<article   className=" ma80 br3 shadow ba dark-gray b--black-10  center blues new"  style={{width:"60%"}}>
				<main className="pa1 black-80" style={{width:"90%"}} >
				    <fieldset id="profile_page" className="ba b--transparent ph0 mh0">
				      <legend className="newhand fw6 ph0 mh0 center ba bw1 pro ">PROFILE</legend>
				      <div className="new" >
				      	<div  className="mt3 " style={{margin:"5px"}}>
						    <label style={{color:styles}} className="db fw6  newhand padd" >{handle}</label>
						    <label style={{color:styles}} className="db fw6  newrate padd" >{rating}</label>					    
						    <ul>			      		
						      <li>
						        <label className="db fw6 lh-copy new" >Name</label>
						        <h3 style={{margin:"8px"}}>{name}</h3>
						      </li>
						      <li>
						        <label className="db fw6 lh-copy new" >Email</label>
						        <h3 style={{margin:"8px"}}>{email}</h3>
						      </li>
						      <li>
						        <label className="db fw6 lh-copy new" >Institution</label>
						        <h3 style={{margin:"8px"}}>{institution}</h3>
						      </li>					      
						    </ul>
						</div>
						<div className="mt3">
							<div>
							<img id="inputimage" src={imgs} alt="" width="100px" height="100px" />
							
							</div>
						</div>
					  </div>
				    </fieldset>
				</main>
			</article>
		</div>
	);
}
export default Profile;