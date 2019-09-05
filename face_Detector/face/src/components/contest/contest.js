import React,{Component} from 'react';
import Contest_q from '../contest_q/contest_q.js';
import Scroll from "../scroll/scroll";
import "./contest.css"
import Question from "../question/question"
import Editor from "../editor/editor"


class Contest extends Component{
	constructor(props){
		super(props);
		this.state={
			route:"contest",
			id:this.props.contestId,
			name:"",
			questions:[],
			question:{},
			userSolved:new Set()
		}
	}
	componentDidMount=()=>{
		const problems=[{id:1,name:"cows problem"},{id:2,name:"rat race"},{id:3,name:"fastest car"},{id:4,name:"road runner"}];
		this.setState({questions:problems});
		this.setState({name:"code milenga"})
	}
	onSubmitContest=(text)=>{
		console.log(text);
	}
	openProblem=(id)=>{
		const prob={id:1,name:"cat race",question:"You are given a weighted tree consisting of n vertices. Recall that a tree is a connected graph without cycles.\n Vertices ui and vi are connected by an edge with weight wi.You are given m queries. The i-th query is given as an integer qi. In this query you need to calculate the number of pairs \n of vertices (u,v) (u<v) such that the maximum weight of an edge on a simple path between u and v doesn't exceed qi.",
    	input:"The first line of the input contains two integers n and m (1≤n,m≤2⋅105) — the number of vertices in the tree and the number of queries.Each of the next n−1 lines describes an edge of the tree. \n Edge i is denoted by three integers ui, vi and wi — the labels of vertices it connects (1≤ui,vi≤n, ui≠vi) and the weight of the edge (1≤wi≤2⋅105). \nIt is guaranteed that the given edges form a tree."}		
    	this.setState({question:prob});
		this.setState({route:"contestQ"});
	}
	routeChange=(text)=>{
		this.setState({route:text})
	}

	render(){
		if(this.state.route==='contest'){
			const comp=[]
			for(let i=0;i<this.state.questions.length;i++){
				if(this.state.userSolved.has(this.state.questions[i].id))
					comp.push(<Contest_q key={this.state.questions[i].id} id={this.state.questions[i].id} name={this.state.questions[i].name} isAccepted={1} problemC={this.openProblem} />)
				else
					comp.push(<Contest_q key={this.state.questions[i].id} id={this.state.questions[i].id} name={this.state.questions[i].name} isAccepted={0} problemC={this.openProblem} />)

			}
			return(
				<div >

					<legend className="f1 fw6 ph0 mh0 center">{this.state.name}</legend>
					<div className="navbars">
						<a onClick={()=>this.routeChange("contest")} >problems</a>
						<a onClick={()=>this.routeChange("leaderboard")}>leaderboard</a>
					</div>
					<table style={{width:"80%",paddingTop:"40px"}}>
						<tbody>
							<tr className="new bin " >
								<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
								<td  className="ba bw1 pointer" style={{width:"85%"}}>PROBLEM</td>
								<td className="ba bw1" style={{width:"5%"}} >AC</td>
							</tr>
								{comp}
						</tbody>
					</table>
				</div>

			);
		}
		else{
		    return(
		      <div>
			  <legend className="f1 fw6 ph0 mh0 center">{this.state.name}</legend>
     		  <div className="navbars">
					<a onClick={()=>this.routeChange("contest")} >problems</a>
		     		<a onClick={()=>this.routeChange("leaderboard")}>leaderboard</a>
		      </div>
	          <div>
	            <Question name={this.state.question.name} question={this.state.question.question} input={this.state.question.input} />
	            <Editor onSubmit={this.onSubmitContest} />
	          </div>
	          </div>
          	);
		}
	}
}
export default Contest;








