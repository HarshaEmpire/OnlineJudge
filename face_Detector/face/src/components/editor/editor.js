import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/mode/javascript'
// import 'brace/mode/python'
import 'brace/theme/monokai'



class Editor extends Component{
	constructor(props){
		super(props);
		this.state={lang:"java"};
	}
	changeEditor=(ids)=>{
		this.setState({lang:ids});
	}
	onSubmits=()=>{

	    const editor = this.ace.editor; // The editor object is from Ace's API
	    console.log(editor.getValue());
	    this.props.onSubmit(editor.getValue());
	}
	render(){
		var editor;
		var code;
		return(
		<div>
			<div className="ma2 center">
				<table>
					<tbody>
						<tr>
	                        <td><input type="radio" name="site_name" 
	                                   value={"c"} 
	                                   onChange={()=>this.changeEditor("c")} />{"c"}
	                        </td>
                        	<td><input type="radio" name="site_name" 
                                   value={"c++"} 
                                   onChange={()=>this.changeEditor("javascript")} />{"javascript"}
                            </td>
                        	<td><input type="radio" name="site_name" 
                                   value={"java"} 
                                   onChange={()=>this.changeEditor("java")} />{"java"}
                            </td>
                        	<td><input type="radio" name="site_name" 
                                   value={"python"} 
                                   onChange={()=>this.changeEditor("python")} />{"python"}
                            </td>

						</tr>
					</tbody>
				</table>
			</div>
			<div className="center">
				<AceEditor mode={this.state.lang} theme="monokai"  ref={instance => { this.ace = instance; }}/>
			</div>
			<div className="center">
				<button  onClick={this.onSubmits} className="center w-45 grow f4 link pa2 pd2 dib white bg-light-purple">submit</button>
			</div>

			
		</div>);
	}
}
export default Editor;