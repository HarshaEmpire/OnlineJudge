import React, { Component } from "react";
import "./timer.css"
class Timer extends Component {
  constructor(props){
    super(props);
    this.state={
      timerOn: true,
      timerTime: this.props.time
    }
    this._isMounted = false;
  }
  componentDidMount=()=>{
    console.log('ppp',this.props.time)
    this._isMounted = true;
    this._isMounted && this.startTimer();
  }
  componentWillUnmount=()=>{
    this._isMounted = false;
  }
  startTimer = () => {

    if(this.state.timerOn===true){
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0 ) {
        this._isMounted && this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this._isMounted && this.setState({ timerOn: false });
        alert("ContestOver");
        this.props.routeChanger("home");
      }
    }, 10);
  }
  };

  render() {
    const { timerTime, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div className="Appy  App-title Countdown" >
        <div className="Countdown-time Timers">HH : MM : SS</div>
        <div>
          <div className="Countdown-time Countdown-display Timers " style={{fontSize:"0.6rem"}}>
            {hours} : {minutes} : {seconds}
          </div>
        </div>
      
      </div>
    );
  }
}

export default Timer;