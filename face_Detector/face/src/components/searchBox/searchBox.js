import React from 'react';
const SearchBox=({onSearchChange})=>{
	return(
		<div className="ma4">
			<center><input type="search" placeholder="search by tag" 
			  className="pa3" /></center>
			<center><button onClick={onSearchChange} className="center w-45 grow f4 link pa2 pd2 dib white bg-light-purple zone">SEARCH</button></center>
		</div>
		);
}
export default SearchBox;