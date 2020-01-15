




import React, { Component } from 'react';
import "./Navigation.css"



class Navigation extends Component{
	constructor(props){
		super(props);
		this.state={
			isClicked:false
		}
	}
	changeClicker=()=>{
		if(this.state.isClicked===true)
			this.setState({isClicked:false})
		else
			this.setState({isClicked:true})
	}
	
	clearStates=()=>{
		this.props.clearState();
	}
	OnrouteChanger1=()=>{
		this.props.OnrouteChange("signin");
	}
	OnrouteChanger2=()=>{
		this.props.OnrouteChange("register");
	}
	OnrouteChanger3=()=>{
		this.props.important_fetch();
		this.props.OnrouteChange("home");
	}
	OnrouteChanger4=()=>{
		this.props.problemSet();
	}
	OnrouteChanger5=()=>{
		this.props.OnrouteChange("ContestSet");
	}
	OnrouteChanger6=()=>{
		this.props.OnrouteChange("makeContest");
	}
	// deleteAccount=()=>{

	// 	const {email}=this.props;
	// 	fetch("http://localhost:3000/delete",{
	// 		method: 'post',
	// 		headers :{'Content-Type':'application/json'},
	// 		body :JSON.stringify({
	// 			email:email
	// 		})
	// 	}).then(res => res.json())
	// 	.then(user => {
	// 		if(user.id){
	// 			this.clearStates();
	// 			this.OnrouteChanger1();
	// 			}
	// 		else{
	// 			alert("some error occured!!!!")
	// 		}
	// 	}).catch(err => alert("some problem with server!!!!"))
	// }
	render(){
		if(this.props.issignedin === true){
		return(
			<div className="navbar">
			<div className="dropdown ">
				<button className="dropbtn">≡<i className="fa fa-caret-down"></i>
	    		</button>
				<div className="dropdown-content">
					<a className="pointer" onClick={this.OnrouteChanger3.bind(this)}>
						{"Profile"}
					</a>
					<a className="pointer" onClick={this.OnrouteChanger4.bind(this)}>
						{"Problem Set"}
					</a>
					<a className="pointer" onClick={this.OnrouteChanger5.bind(this)}>
						{"Contest page"}
					</a>
					<a className="pointer" onClick={this.OnrouteChanger6.bind(this)}>
						{"Make Contest"}
					</a>
					<a className="pointer"  onClick={this.OnrouteChanger1.bind(this) , this.clearStates.bind(this)}>
						{"Sign Out"}
					</a>
				</div>
			</div>
			</div>
			);
		}
		else{

			return(
				<div></div>
			)
		}
}
}
export default Navigation;
