import React, { Component } from 'react';
import './App.css';
import {connect}  from 'react-redux'; 
import {onInputChange,onImgUrlChange,onBoxChange,onRouteChange,onUserChange,isSignedChange,clearHome,problemChange,searchChange} from "./action.js";
import Navigation from "./components/navigation/Navigation"
import Logo from "./components/logo/logo"
import Rank from "./components/rank/rank"
import ImageLinkForm from "./components/imgLink/imgLink"
import Particles from 'react-particles-js';
import FaceRec from "./components/faces/faces"
import Signin from "./components/signin/signin"
import Register from "./components/register/register"
import Profile from "./components/profile/profile"
import Problems from "./components/problems/problems"
import Question from "./components/question/question"
import Editor from "./components/editor/editor"
import WrongProblem from "./components/wrongProblem/wrongProblem"
import SearchBox from "./components/searchBox/searchBox"
import Contest from "./components/contest/contest"
// hackerearth 





const mapStateToProps = state =>{
  return {
    route:state.home.route,
    user:state.home.user,
    issignedin:state.home.issignedin,
    problem:state.home.problem,
    allProblems:state.home.allProblems,
    contestId:state.home.contestId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  loadUser: (data) => dispatch(onUserChange(data)),
  onRoutesChange: (data) => dispatch(onRouteChange(data)),
  isSignedsChange: data => dispatch(isSignedChange(data)),
  onClean: () => dispatch(clearHome()),
  onProblemChange:(data)=>dispatch(problemChange(data)),
  onSearchChange:(data)=>dispatch(searchChange(data))
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

onSearch=(event)=>{
  var str=(event.target.value).split(",");
  console.log(str);
  const problems=[{id:1,name:"cows problem",difficulty:2100},{id:2,name:"rat race",difficulty:2100},{id:3,name:"fastest car",difficulty:2100},{id:4,name:"road runner",difficulty:2100}];
  this.props.onSearchChange(problems);


}



openProblem=(id)=>{
   const prob={id:1,name:"cat race",question:"You are given a weighted tree consisting of n vertices. Recall that a tree is a connected graph without cycles.\n Vertices ui and vi are connected by an edge with weight wi.You are given m queries. The i-th query is given as an integer qi. In this query you need to calculate the number of pairs \n of vertices (u,v) (u<v) such that the maximum weight of an edge on a simple path between u and v doesn't exceed qi.",
    input:"The first line of the input contains two integers n and m (1≤n,m≤2⋅105) — the number of vertices in the tree and the number of queries.Each of the next n−1 lines describes an edge of the tree. \n Edge i is denoted by three integers ui, vi and wi — the labels of vertices it connects (1≤ui,vi≤n, ui≠vi) and the weight of the edge (1≤wi≤2⋅105). \nIt is guaranteed that the given edges form a tree."}
  this.props.onProblemChange(prob);
  if(this.prop.route==="problemSet")
    this.props.onRoutesChange("question");
  else
    this.props.onRoutesChange("Cquestion");

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
    

   const {name,question,input}=this.props.problem;
    return (
      <div className="App">
        <Navigation OnrouteChange={this.OnrouteChange} clearState={this.clearState} issignedin={this.props.issignedin} />
        {this.props.route === 'signin'?
            <signin OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} />
        :this.props.route === 'home'? 
          <div style={{display:"flex",position:"relative"}}>
            <div style={{width:"80"}}>
              <Profile name={"harsh"} handle={"harshaEmpire"} rating={"1562"} email={"harsh@gmail.com"} institution={"mnnit"} styles={"red"}/>
            </div>
            <div style={{width:"20%"}}>
              <WrongProblem problems={this.props.user.wrong_arr} openProblem={this.openProblem} />
            </div>
          </div>
        :this.props.route === 'contest'?
          <Contest contestId={this.props.contestId} />
        // :this.props.route === 'Cquestion':

        :this.props.route === 'problemSet'?
            <div>
              <SearchBox onSearchChange={this.onSearch} />
              <Problems problems={this.props.allProblems} userSolved={this.props.user.solved} openProblem={this.openProblem} />
            </div>
        :this.props.route === 'question'?
            <div>
              < Question name={name} question={question} input={input} />
              < Editor onSubmit={this.onSubmit}/>
            </div>
        :<Register OnrouteChange={this.OnrouteChange} loadUser={this.props.loadUser} />}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
