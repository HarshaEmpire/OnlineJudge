import React,{Component} from 'react';
import Contest_q from '../contest_q/contest_q.js';
import Scroll from "../scroll/scroll";
import "./contest.css"
import Question from "../question/question"
import Editor from "../editor/editor"
import Timer from "../timer/timer"
import Leaderboard from "../leaderboard/leaderboard"
import moment from 'moment'


class Contest extends Component{
	constructor(props){
		super(props);
		this.state={
			route:"contest",
			contest:{c_id:4,c_name:"hello try",date_start:moment().add(2,'hours'),date_con:moment().add(3,'hours')},
			questions:[],
			question:{},
			currentTime:moment(),
			status:"",
			mark:0

		}
	}
	componentDidMount=()=>{
		fetch(`http://localhost:3001/getContestInfo?id=${this.props.contestId}`)
		.then(res => res.json())
		.then((data)=>{
			this.setState({contest:data})
		})

		 fetch(`http://localhost:3001/getContestProblem?id=${this.props.contestId}`)
	    .then(res => res.json())
	    .then((data)=>{
	      this.setState({questions:data})
	    })
	    .catch(err => alert("try again")); 


		fetch("http://localhost:3001/getTime")
	    .then(res => res.json())
	    .then(data=>{
	    	this.setState({currentTime:data});
	    })

		// const problems=[{id:1,name:"cows problem"},{id:2,name:"rat race"},{id:3,name:"fastest car"},{id:4,name:"road runner"}];
		// this.setState({questions:problems});
		// this.setState({name:"code milenga"})
	}
	onSubmitContest=(object)=>{
			let end=moment(this.state.contest.date_con)
			let present=moment(this.state.currentTime)
			let mark=0;
			if(end.isBefore(present)===true)
				mark=1;
			console.log("tututut")
		    fetch("http://localhost:3001/checkContestProblem",{
		      method: 'post',
		      headers :{'Content-Type':'application/json'},
		      async:false,
		      body :JSON.stringify({
		        data:object.text,
		        lang:object.lang,
		        p_id:this.state.question.p_id,
		        c_id:this.props.contestId,
		        u_id:this.props.u_id,
		        c_name:this.state.question.c_name,
		        mark:mark,
		        score:500
		        // questionId:this.props.Problem.id,
		        // contestId:this.props.contest.id;

		      })
		    }).then(res => res.json())
		    .then(data=> {
		    	console.log("ppppp");
		    	this.setState({status:data})
		    	this.setState({mark:1})})
		    .catch(err => console.log(err));
	}

	openProblem=(id,c_id,c_name,difficulty)=>{


	    fetch(`http://localhost:3001/getProblem?id=${id}&&c_id=${c_id}&&c_name=${c_name}&&difficulty=${difficulty}`)
	    .then(res => res.json())
	    .then((data)=>{
	      this.setState({question:data.prob[0]});
	      this.setState({route:"problem"});
	    })
	    .catch(err => alert("try again")); 
	}

	routeChange=(text)=>{
		this.setState({route:text})
	}

	render(){
		let end=moment(this.state.contest.date_con)
		let present=moment(this.state.currentTime)
		let start=moment(this.state.contest.date_start)
		if(this.state.route==='contest'){
			const comp=[]
			for(let i=0;i<this.state.questions.length;i++){
				if((this.props.userSolved.has(JSON.stringify({'p_id':this.state.questions[i].p_id,'c_id':this.state.questions[i].c_id}))))
					comp.push(<Contest_q key={i} id={this.state.questions[i].p_id} c_id={this.state.questions[i].c_id}
					 c_name={this.state.questions[i].c_name} difficulty={this.state.questions[i].difficulty} 
					 name={this.state.questions[i].p_name} isAccepted={1} problemC={this.openProblem} />)
				else
					comp.push(<Contest_q key={i} id={this.state.questions[i].p_id} c_id={this.state.questions[i].c_id}
					 c_name={this.state.questions[i].c_name} difficulty={this.state.questions[i].difficulty} 
					 name={this.state.questions[i].p_name} isAccepted={0} problemC={this.openProblem} />)

			}
			return(

				<div >

					<legend className="f1 fw6 ph0 mh0 center">{this.state.contest.c_name}</legend>
					<div className="navbars">
						<a onClick={()=>this.routeChange("contest")} >problems</a>
						<a onClick={()=>this.routeChange("leaderboard")}>leaderboard</a>
					</div>
					{present.isBefore(end)===true?
					<div className="pv3" >
						<div style={{display:"flex"}}>
						<table  style={{width:"60%"}}>
							<tbody>
								<tr  className="new">
									<td  className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
									<td  className="ba bw1 pointer" style={{width:"85%"}}>PROBLEM</td>
									<td className="ba bw1" style={{width:"5%"}} >AC</td>
								</tr>
									{comp}
							</tbody>
						</table>
						<Timer style={{width:"40%"}} key={moment()} time={end.diff(present)} routeChanger={this.props.routeChanger}/>
						</div>
					</div>
					:
					<div className="pv3" >
						<table  style={{width:"100%"}}>
							<tbody>
								<tr  className="new">
									<td  className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
									<td  className="ba bw1 pointer" style={{width:"85%"}}>PROBLEM</td>
									<td className="ba bw1" style={{width:"5%"}} >AC</td>
								</tr>
									{comp}
							</tbody>
						</table>
					</div>}
				</div>

			);
		}
		else if(this.state.route==="problem"){

		    return(
		      <div>
			  <legend className="f1 fw6 ph0 mh0 center">{this.state.contest.c_name}</legend>
     		  <div className="navbars">
					<a onClick={()=>this.routeChange("contest")} >problems</a>
		     		<a onClick={()=>this.routeChange("leaderboard")}>leaderboard</a>
		      </div>
		      {present.isAfter(end)===true?
	          <div>
				<Question name={this.state.question.p_name} question={this.state.question.question} input={this.state.question.input_form} output={this.state.question
				.output_form} input1={this.state.question.sample_ip} output1={this.state.question.sample_op} />
	            <Editor onSubmit={this.onSubmitContest} p_id={this.state.question.p_id} c_name={this.state.question.c_name} 
	              c_id={this.state.question.c_id} />
	            {this.state.mark===1 && <div className="ba bw1 center ma2" style={{width:"80%",fontSize:"1em"}}>{this.state.status}</div>}
		       </div>
	          :
	          	<div>
	          	<div style={{display:"flex"}} >
	            	<Question name={this.state.question.p_name} question={this.state.question.question} input={this.state.question.input_form} output={this.state.question
	            	.output_form} input1={this.state.question.sample_ip} output1={this.state.question.sample_op} />
	            	<div>
	            	<Timer time={end.diff(present)} routeChanger={this.props.routeChanger}/>
	            	</div>
	            </div>
	            <Editor onSubmit={this.onSubmitContest} p_id={this.state.question.p_id} c_name={this.state.question.c_name} 
	              c_id={this.state.question.c_id} />
	            {this.state.mark===1 && <div className="ba bw1 center ma2" style={{width:"80%",fontSize:"1em"}}>{this.state.status}</div>}
	            </div>
	           }	          
	          </div>
          	);
		}
		else{
			return(
			<div>
			  <legend className="f1 fw6 ph0 mh0 center">{this.state.contest.c_name}</legend>
     		  <div className="navbars">
					<a onClick={()=>this.routeChange("contest")} >problems</a>
		     		<a onClick={()=>this.routeChange("leaderboard")}>leaderboard</a>
		      </div>
			<Leaderboard contestId={this.state.contest.c_id} />
			</div>
			)
		}
	}
}
export default Contest;








