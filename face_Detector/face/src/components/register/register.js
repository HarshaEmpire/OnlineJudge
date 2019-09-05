import React from  'react';
import {onRPasswordChange,onREmailChange,onRMarkChange,clearRegister,onRNameChange} from "../../action";
import {connect}  from 'react-redux'; 

const mapStateToProps = state =>{
	return {
		password:state.register.password,
		email:state.register.email,
		mark:state.register.mark,
		name:state.register.name
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	onPasswordsChange: (event) => dispatch(onRPasswordChange(event.target.value)),
	onEmailsChange: (event) => dispatch(onREmailChange(event.target.value)),
	onMarksChange: (val) => dispatch(onRMarkChange(val)),
	onNamesChange: (event) => dispatch(onRNameChange(event.target.value)),
	onClear:() => dispatch(clearRegister())
	}
}



class Register extends React.Component{

	onSubmit =()=>{
		const {email,password,name,onClear,onMarksChange}=this.props;
		var pass= new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.{8,})")
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
				if(pass.test(password)){
					fetch("http://localhost:3000/register",{
						method: 'post',
						headers :{'Content-Type':'application/json'},
						body :JSON.stringify({
							email:email,
							name:name,
							password:password
						})
					}).then(res => res.json())
					.then(user => {
						if(user.id){
							onClear();
							this.props.loadUser(user);
							this.props.OnrouteChange('home');
						}
						else{
							onMarksChange(1);
						}
					})
					.catch(err => alert("can't connect to server"));
				}
				else{
					alert("the password should be atleast 8 characters long with one capital letter one small letter and one number");
				}
			}
		else{
			alert("improper email");
		}
		
	}
	render(){
	const {onNamesChange,onEmailsChange,onPasswordsChange,mark}=this.props;
	return(
		<article style={{marginTop:"200px"}} className="br3 shadow ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name" >Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" 
			        onChange={onNamesChange} required/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
			        onChange={onEmailsChange} required/>
			      </div>
			      {mark===1 && 
			
			      		<div style={{height:20,marginTop:0}} className='center'>
			      			<h5 style={{color:"red",marginTop:0}}>{"choose different username"}</h5>
			      		</div>}
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password" required>Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
			        onChange={onPasswordsChange} required/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
			      type="submit" 
			      value="Register" 
			      onClick={this.onSubmit}
			      />
			    </div>
			  </div>
			</main>
		</article>
		);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);