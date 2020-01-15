import React,{Component} from 'react';
import ContestCard from '../contestCard/contestCard.js';
import Scroll from "../scroll/scroll";
import "./contestSet.css"
import moment from 'moment'

class ContestSet extends Component{
	constructor(props){
		super(props);
		this.state={
			contests:[],
			present:"",
			date:''
		}
	}

  componentDidMount=()=>{
  	    fetch(`http://localhost:3001/getAllContests`)
	    .then(res => res.json())
	    .then((data)=>{
	      this.setState({contests:data.con});
	    })
	    .catch(err => alert("try again")); 

	    fetch("http://localhost:3001/getTime").then(res=>res.json())
	    .then(data=>{this.setState({date:data})})
	    .catch(err=>console.error(err))




  }
  register=(id)=>{
  	  	 fetch(`http://localhost:3001/registerContest?c_id=${id}&u_id=${this.props.u_id}`)
	    .then(res => res.json())
	    .then((data)=>{
	      alert("registration successful")
	    })
	    .catch(err => alert("try again")); 
  }
	render(){
		const {contests}=this.state;
		
			var time=this.state.date
			var present=moment(time)
			const con1=[]
			const con2=[]
			const con3=[]
			for(let i=0;i<contests.length;i++){
				let start=moment(contests[i].date_start);
				let end=moment(contests[i].date_con);
				if(present.isAfter(end)===true)
					con1.push(<ContestCard key={this.state.contests[i].c_id} id={this.state.contests[i].c_id} name={this.state.contests[i].c_name} start={
						moment(this.state.contests[i].date_start).format("YYYY-MM-DD HH:mm:ss")
					} end={moment(this.state.contests[i].date_con).format("YYYY-MM-DD HH:mm:ss")} problem={this.props.openContest} />)
				else if(present.isBefore(end) && present.isAfter(start)){
					con2.push(<ContestCard key={this.state.contests[i].c_id} id={this.state.contests[i].c_id} name={this.state.contests[i].c_name} 
						start={moment(this.state.contests[i].date_start).format("YYYY-MM-DD HH:mm:ss")} 
						end={moment(this.state.contests[i].date_con).format("YYYY-MM-DD HH:mm:ss")} problem={this.props.openContest} />)					
				}
				else{
					con3.push(<ContestCard key={this.state.contests[i].c_id} id={this.state.contests[i].c_id} 
					name={this.state.contests[i].c_name} start={moment(this.state.contests[i].date_start).format("YYYY-MM-DD HH:mm:ss")} 
					end={moment(this.state.contests[i].date_con).format("YYYY-MM-DD HH:mm:ss")} problem={this.register} />)
				}
			}
			return(
				<div >{con1.length!=0 && <div className="pv3" >
					<legend className=" fw6 ph0 mh0 center">PAST CONTESTS</legend>
					<div style={{overflowY:"scroll",maxHeight:"200px"}} >
					<table  style={{width:"100%"}}>
						<tbody>
							<tr  className="new">
								<td  className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
								<td  className="ba bw1 pointer" style={{width:"50%"}}>NAME</td>
								<td className="ba bw1" style={{width:"20%"}} >START</td>
								<td className="ba bw1" style={{width:"20%"}} >END</td>
							</tr>
								{con1}
						</tbody>
					</table>
					</div>
					</div>}
					{con2.length!=0 && <div style={{overflowY:"scroll",maxHeight:"200px"}} className="pv3">
					<legend className=" fw6 ph0 mh0 center">PRESENT CONTESTS</legend>
					<table  style={{width:"100%"}}>
						<tbody>
							<tr className="new " >
								<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
								<td  className="ba bw1 pointer" style={{width:"50%"}}>NAME</td>
								<td className="ba bw1" style={{width:"20%"}} >START</td>
								<td className="ba bw1" style={{width:"20%"}} >END</td>
							</tr>
								{con2}
						</tbody>
					</table>
					</div>}
					{con3.length!=0 && <div style={{overflowY:"scroll",maxHeight:"200px"}} className="pv3"> 
					<legend className=" fw6 ph0 mh0 center">FUTURE CONTESTS</legend>
					<table  style={{width:"100%"}}>
						<tbody>
							<tr className="new " >
								<td className="ba bw1 center" style={{width:"10%",paddingBottom: "15px"}}>ID</td>
								<td  className="ba bw1 pointer" style={{width:"50%"}}>NAME</td>
								<td className="ba bw1" style={{width:"20%"}} >START</td>
								<td className="ba bw1" style={{width:"20%"}} >END</td>
							</tr>
								{con3}
						</tbody>
					</table>
					</div>}
				</div>

			);

	}



}
export default ContestSet;