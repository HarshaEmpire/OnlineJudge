import React, { Component } from 'react';
import './App.css';
import {connect}  from 'react-redux'; 
import {onInputChange,onImgUrlChange,onBoxChange,onRouteChange,onUserChange,isSignedChange,clearHome,problemChange,searchChange,contestChange,LoadKey} from "./action.js";
import Navigation from "./components/navigation/Navigation"
import Logo from "./components/logo/logo"
import Rank from "./components/rank/rank"
import ImageLinkForm from "./components/imgLink/imgLink"
import Particles from 'react-particles-js';
import FaceRec from "./components/faces/faces"
import Signin from "./components/signin/signin"
import Register from "./components/register/register"
import Profile from "./components/profile/profile"
import Question from "./components/question/question"
import Editor from "./components/editor/editor"
import Problems from "./components/problems/problems"
import WrongProblem from "./components/wrongProblem/wrongProblem"
import Contest from "./components/contest/contest"
import UpcomingC from "./components/upcomingC/upcomingC"
// hackerearth 





const mapStateToProps = state =>{
  return {
    route:state.home.route,
    user:state.home.user,
    issignedin:state.home.issignedin,
    contestId:state.home.contestId,
    contests:state.home.contests,
    question:state.home.problem,
    keys:state.home.keys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  loadUser: (data) => dispatch(onUserChange(data)),
  onRoutesChange: (data) => dispatch(onRouteChange(data)),
  isSignedsChange: data => dispatch(isSignedChange(data)),
  onClean: () => dispatch(clearHome()),
  onProblemChange:(data)=>dispatch(problemChange(data)),
  onContestChange:(val)=>dispatch(contestChange(val)),
  loadKey:(val)=>dispatch(LoadKey(val))
  }
}




 
class App extends Component {
onSubmit=(text)=>{
  console.log(text);

    fetch("http://localhost:3000/kur",{
      method: 'post',
      headers :{'Content-Type':'application/json'},
      body :JSON.stringify({
        data:text,
      })
    }).then(res => res.json())
    .then(data=> console.log(data))
}



  componentDidMount=()=>{
    //get data from database
    const con=[{id:1,name:"challenge urself",start:"7:15",end:"9:15"},{id:2,name:"challenge 2",start:"9:00",end:"10:00"},
              {id:3,name:"challenge 3",start:"1:00",end:"3:00"}];
    this.props.onContestChange(con);
  }

  problemSet=()=>{
    //call the data base
    console.log(this.props.route);
    var tt=this.props.keys;
    console.log(this.props.keys);
    const prob=[{id:1,name:"cows problem",difficulty:2100},{id:2,name:"rat race",difficulty:2100},{id:4,name:"road runner",difficulty:2100}];
    if(this.props.route === "problemSet"){
      if(this.props.keys === "1" ) {
        this.props.loadKey("2")
      }
      else{
        this.props.loadKey("1");
      }
      
    }
    this.props.onRoutesChange("problemSet");

  }

openProblem=(id)=>{
  //get data from database
   const prob={id:1,name:"cat race",question:"You are given a weighted tree consisting of n vertices. Recall that a tree is a connected graph without cycles.\n Vertices ui and vi are connected by an edge with weight wi.You are given m queries. The i-th query is given as an integer qi. In this query you need to calculate the number of pairs \n of vertices (u,v) (u<v) such that the maximum weight of an edge on a simple path between u and v doesn't exceed qi.",
    input:"The first line of the input contains two integers n and m (1≤n,m≤2⋅105) — the number of vertices in the tree and the number of queries.Each of the next n−1 lines describes an edge of the tree. \n Edge i is denoted by three integers ui, vi and wi — the labels of vertices it connects (1≤ui,vi≤n, ui≠vi) and the weight of the edge (1≤wi≤2⋅105). \nIt is guaranteed that the given edges form a tree."}
  this.props.onProblemChange(prob);
  this.props.onRoutesChange("question");
}

onClear = () => {
  this.props.onClean();
}

OnrouteChange = (route) => {
    this.props.onRoutesChange(route);
    if(route === "signin" || route==="register"){
        this.props.isSignedsChange(false);
    }
    else
        this.props.isSignedsChange(true);
}

// onSubmitContest=(text)=>{
//     fetch("http://localhost:3000/contest",{
//       method: 'post',
//       headers :{'Content-Type':'application/json'},
//       body :JSON.stringify({
//         data:text,
//         questionId:this.props.Problem.id,
//         contestId:this.props.contest.id;

//       })
//     }).then(res => res.json())
//     .then(data=> console.log(data))
// }
  render() {
    
    console.log("uuu");
    return (
      <div className="App">
        <Navigation OnrouteChange={this.OnrouteChange} clearState={this.clearState} issignedin={this.props.issignedin} problemSet={this.problemSet} />
        {this.props.route === 'signin'?
            <signin OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} />
        :this.props.route === 'home'? 
          <div style={{display:"flex",position:"relative"}}>
            <div style={{width:"80"}}>
              <Profile name={"harsh"} handle={"harshaEmpire"} rating={"1562"} email={"harsh@gmail.com"} institution={"mnnit"} styles={"red"}/>
            </div>
            <div style={{width:"20%"}}>
              <WrongProblem problems={this.props.user.wrong_arr} openProblem={this.openProblem} />
              <UpcomingC contests={this.props.contests} problem={this.openProblem}/>
            </div>
          </div>
        :this.props.route === 'contest'?
          <Contest contestId={this.props.contestId} />
        :this.props.route === 'problemSet'?
          <Problems key={this.props.keys} userSolved={this.props.user.userSolved} />
        :this.props.route === 'question'?
          <div>
            <Question name={this.props.question.name} question={this.props.question.question} input={this.props.question.input} />
            <Editor onSubmit={this.onSubmit} />
          </div>
        :<Register OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} />}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
