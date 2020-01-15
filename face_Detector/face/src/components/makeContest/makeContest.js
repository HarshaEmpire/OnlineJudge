import React, { Component } from 'react';
import DateTime from 'react-datetime'
import moment from 'moment'
import 'react-datetime/css/react-datetime.css'
import Upload from "../upload/upload"
class MakeContest extends Component {
  constructor(props) {
    super(props);
    this.state = { contestName: '',
                   noOfQuestion:0,
                   StartDateTime:new Date() ,
                   items:[],
                   EndDateTime:new Date(),
                    viewMode: 'days',
                    dateFormat: 'MM/DD/YYYY',
                    timeFormat: 'HH:mm A',
                    input: true,
                    utc: false,
                    closeOnSelect: false,
                    closeOnTab: true

                  };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.DateTime);
  }
  ChangeName = (event) => {
    this.setState({contestName: event.target.value});


  }
  ChangeName1 = (event) => {
    fetch(`http://localhost:3001/open?name=${this.state.contestName}`)
    .then(res=>res.json())
    .then(data=>{})
    .catch(err=>console.log(err))
    document.getElementById('name').disabled=true;

  }
  ChangeNumber1 = () => {
    let crr=[]
    document.getElementById('number').disabled=true;
    for(let i=0;i<this.state.noOfQuestion;i++){
        fetch(`http://localhost:3001/open?name=${this.state.contestName}/${i}`)
        .then(res=>res.json())
        .then((data)=>{
                crr.push(<div key={i}><p>{`enter question ${i+1}`}</p><div className="App">
                  <div className="Card">
                    <Upload name={`${this.state.contestName}/${i}`} />
                  </div>
                </div></div>);
                if(i===this.state.noOfQuestion-1)
                    this.setState({items:crr})
        })
        .catch(err=>console.log(err))

    }
    
  }
  ChangeNumber = (event) => {
    
    this.setState({noOfQuestion: event.target.value});
  }
  ChangeStartDateTime = (even) => {
    console.log(even.isAfter(moment()));
    this.setState({StartDateTime: even});
  }
  ChangeEndDateTime = (even) => {
    this.setState({EndDateTime: even});
  }
  SubmitContest=()=>{
    fetch('http://localhost:3001/getTime')
    .then(res=>res.json())
    .then(data=>{
      if(!(moment(data).add(3,'hours').isBefore(this.state.StartDateTime)) && !(moment(this.state.StartDateTime).isBefore(this.state.EndDateTime)))
        alert("choose a right time")
      else{
          console.log()
          fetch("http://localhost:3001/makeContest",{
                  method: 'post',
                  headers :{'Content-Type':'application/json'},
                  async:false,
                  body :JSON.stringify({
                    name:this.state.contestName,
                    number:this.state.noOfQuestion,
                    start:moment(this.state.StartDateTime).format("YYYY-MM-DD HH:mm:ss"),
                    end:moment(this.state.EndDateTime).format("YYYY-MM-DD HH:mm:ss"),
                  })
                }).then(res => res.json())
                .then(data=> {
                    if(data.localeCompare('hy')===0){
                      console.log('contest uploaded');
                      this.props.onRouteChange('home');
                    }
                    else
                      alert('some error occured try again');
                })
                .catch(err => console.log(err));
        }



    })
  }


  render() {
    
    return (
      <div >
      <p>Enter your name of contest</p>
      <div style={{display:'flex'}}>
      <input id='name'
        type='text'
        onChange={this.ChangeName}
        required
      />
      <button onClick={this.ChangeName1}>submit</button>
      </div>
      <p>Enter the number of questions</p>
      <div style={{display:'flex'}}>
      <input
        id="number"
        type='number'
        onChange={this.ChangeNumber}
        required
      />
      <button onClick={this.ChangeNumber1}>submit</button>
      </div>
      <p>Select the start date</p>
        <div className="form-horizontal">
          <DateTime
            defaultValue={new Date()}
            onChange={this.ChangeStartDateTime}
            {...this.state}
          />
          <hr />
        </div>
      <p>Select the end date</p>
        <div className="form-horizontal">
          <DateTime
            defaultValue={new Date()}
            onChange={this.ChangeEndDateTime}
            {...this.state}
          />
          <hr />
        </div>
        <div>
          {this.state.items}
        </div>
        <button onClick={this.SubmitContest}>Submit Contest</button>
        
      </div>
    );
  }
}

export default MakeContest;


