import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/mode/javascript'
// import 'brace/mode/python'
import 'brace/theme/monokai'
import "./editor.css"
import "../profile/profile.css"


class Editor extends Component{
	constructor(props){
		super(props);
		this.state={lang:"java",
			value:"",
			p_id:this.props.p_id
		};
	}
	onRun=(event)=>{

			var bb=document.getElementById("run").value;
			console.log(bb);
			const editor = this.ace.editor;
			var sourceCode=editor.getValue();
			console.log(sourceCode);
			fetch("http://localhost:3001/getAnswer",{
	        method: 'post',
			headers :{'Content-Type':'application/json'},
		    async:false,
			body :JSON.stringify({
			data:sourceCode,
	        lang:this.state.lang,
	        p_id:this.state.p_id,
	        input:bb
			        // questionId:this.props.Problem.id,
			        // contestId:this.props.contest.id;
			})
			}).then(res => res.json())
			.then((datas)=> {
			    document.getElementById("check").value=datas;
			})
			.catch(err => console.log(err));



	  	// 	this.setState()
			// this.setState{run:1};
			// this.setState{value:}
	}


	changeEditor=(ids)=>{
		this.setState({lang:ids});
	}
	onSubmits=()=>{

	    const editor = this.ace.editor; // The editor object is from Ace's API
	    this.props.onSubmit({text:editor.getValue(),lang:this.state.lang});
	}
	render(){
		var editor;
		var code;
		return(
		<div>
			<div className="ma2 center">
				<table className="ba bw1 b--white">
					<tbody>
						<tr>
	                        <td className="space"><input type="radio" name="site_name" 
	                                   value={"c"} 
	                                   onChange={()=>this.changeEditor("c")} />{"c"}
	                        </td>
                        	<td className="space"><input type="radio" name="site_name" 
                                   value={"javascript"} 
                                   onChange={()=>this.changeEditor("javascript")} />{"javascript"}
                            </td>
                        	<td className="space"><input type="radio" name="site_name" 
                                   value={"java"} 
                                   onChange={()=>this.changeEditor("java")} />{"java"}
                            </td>
                        	<td className="space"><input type="radio" name="site_name" 
                                   value={"python"} 
                                   onChange={()=>this.changeEditor("python")} />{"python"}
                            </td>

						</tr>
					</tbody>
				</table>
			</div>
			<div className="center pv1">
				<AceEditor mode={this.state.lang==='c'?"java":this.state.lang} width="500px" height="500px" theme="monokai"  ref={instance => { this.ace = instance; }}/>
			</div>
			<div className="center pv2">
				<button  onClick={this.onSubmits} className="center w-45 grow link pa2 pd2 dib pro zone">submit</button>
			</div>

			<div className="ma3">
				<div>
				<textarea id='run' rows="4" cols="50" placeholder="input" />
				</div>
				<div>
				<button onClick={this.onRun} className="w-45 grow f4 link pa2 pd2 dib white bg-light-purple">Run</button>
				</div>
				<div>
				<textarea disabled id="check" placeholder="output" rows="6" cols="50" />
				</div>
				
			</div>

			
		</div>);
	}
}
export default Editor;