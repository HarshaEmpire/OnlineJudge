import React,{Component} from 'react';
import Card from '../problemCard/problemCard.js';
import Scroll from "../scroll/scroll";
import "./problems.css"
import Question from "../question/question"
import Editor from "../editor/editor"
import SearchBox from "../searchBox/searchBox"

class Problems extends Component{
	constructor(props){
		super(props);
		this.state={
			problems:"",
			route:"problemSet",
			problem:{},
			userSolved:this.props.userSolved,
		}
	}
	onSubmit=(text)=>{
		console.log(text);
	}
  componentDidMount=()=>{
    //get data from database
    const con=[{id:1,name:"cows problem",difficulty:2100},{id:2,name:"rat race",difficulty:2100},{id:4,name:"road runner",difficulty:2100}];
    this.setState({problems:con});
  }
	onSearch=(event)=>{
	  var str=(event.target.value).split(",");
	  //get data from database
	  console.log(str);
	  const prob=[{id:1,name:"cows problem",difficulty:2100},{id:2,name:"rat race",difficulty:2100}];
	  this.setState({problems:prob});
	  this.setState({search:1});
	}
	openProblem=(id)=>{
		const prob={id:1,name:"cat race",question:"You are given a weighted tree consisting of n vertices. Recall that a tree is a connected graph without cycles.\n Vertices ui and vi are connected by an edge with weight wi.You are given m queries. The i-th query is given as an integer qi. In this query you need to calculate the number of pairs \n of vertices (u,v) (u<v) such that the maximum weight of an edge on a simple path between u and v doesn't exceed qi.",
    	input:"The first line of the input contains two integers n and m (1≤n,m≤2⋅105) — the number of vertices in the tree and the number of queries.Each of the next n−1 lines describes an edge of the tree. \n Edge i is denoted by three integers ui, vi and wi — the labels of vertices it connects (1≤ui,vi≤n, ui≠vi) and the weight of the edge (1≤wi≤2⋅105). \nIt is guaranteed that the given edges form a tree."}		
    	this.setState({problem:prob});
		this.setState({route:"problem"});
	}
	render(){

		if(this.state.route==="problemSet"){
			const comp=[]
			for(let i=0;i<this.state.problems.length;i++){
				if(this.state.userSolved.has(this.state.problems[i].id))
					comp.push(<Card key={this.state.problems[i].id} id={this.state.problems[i].id} name={this.state.problems[i].name} isAccepted={1} difficulty={this.state.problems[i].difficulty} problem={this.openProblem} />)
				else
					comp.push(<Card key={this.state.problems[i].id} id={this.state.problems[i].id} name={this.state.problems[i].name} isAccepted={0} difficulty={this.state.problems[i].difficulty} problem={this.openProblem} />)

			}
			return(
				<div >
					<legend className="f1 fw6 ph0 mh0 center">PROBLEM SET</legend>
					<SearchBox onSearchChange={this.onSearch} />
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
		else{
			return(
	          <div>
	            <Question name={this.state.problem.name} question={this.state.problem.question} input={this.state.problem.input} />
	            <Editor onSubmit={this.onSubmit} />
	          </div>
	        );
		}
	}



}
export default Problems;