import React, { Component } from 'react';
import Multiselect from 'multiselect-dropdown-react';

const data = [{
	name:'all',
	value:'all'
},
{
  name: 'array',
  value: 'array'
},
{
    name: 'string',
    value: 'string'
  },
  {
    name: 'number theory',
    value: 'number theory'
  },
  {
    name: 'dp',
    value: 'dp'
  },
  {
  	name:'sum',
  	value:'sum'
  }];
class SearchBox extends Component {
	constructor(props){
		super(props);
		this.result=this.result.bind(this);
	}
  result(params) {
    this.props.onSearchChange(params);
  }
  render() {
    return (
      <div >
        <Multiselect options={data} onSelectOptions={this.result} />
      </div>
    );
  }
}

export default SearchBox;






