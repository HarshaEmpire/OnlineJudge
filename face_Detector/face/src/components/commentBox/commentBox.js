  
import React, { Component } from 'react'
import CommentList from './commentList'
import CommentForm from './commentForm'
import $ from 'jquery'
import style from './commentBox.css'

class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
    this._isMounted = 0;
  }

  loadCommentsFromServer() {
    $.ajax({
      url: `http://localhost:3001/getData?p_id=${this.props.p_id}&&c_id=${this.props.c_id}`,
      dataType: 'json',
      cache: false,
      success: function(datas) {
        this.setState({data:datas});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  }

  handleCommentSubmit(comment) {
    const comments = this.state.data
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = (Date.now()).toString()
    fetch("http://localhost:3001/setData",{
     method: 'post',
     headers :{'Content-Type':'application/json'},
     body :JSON.stringify({
       comment:comment
     })}).then((data)=>{
     }).catch(err=>console.log(err));

  }
  componentDidMount=()=> {
    

    this.loadCommentsFromServer()
    this._isMounted = setInterval(this.loadCommentsFromServer.bind(this),this.props.pollInterval);

     

  }

  componentWillUnmount=()=>{
    
    clearInterval(this._isMounted);
  }
  render() {
    return (
      <div className={style.normal} className="ba bw2">
        <h3 className="center">Comments</h3>
        <div style={{overflowY:"scroll",maxHeight:"300px"}}> 
        <CommentList data={this.state.data} />
        </div>
        <div className="center"><CommentForm className="center" onCommentSubmit={this.handleCommentSubmit.bind(this)}  p_id={this.props.p_id} author={this.props.handle} c_id={this.props.c_id} />
        </div>
      </div>
    )
  }
}

export default CommentBox