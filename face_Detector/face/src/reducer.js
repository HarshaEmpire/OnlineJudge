import {CHANGE_PASSWORD,CHANGE_EMAIL,CHANGE_MARK,CHANGE_RNAME,CHANGE_RPASSWORD,CHANGE_REMAIL,CHANGE_RMARK,clearStates,registerClear,CHANGE_INPUT,CHANGE_IMG_URL,CHANGE_BOX
,CHANGE_ROUTE,CHANGE_USER,CHANGE_ISSIGNEDIN,CLEAR_HOME,ON_CLICK_CHANGE,CHANGE_PROBLEM,CHANGE_SEARCH} from "./constants"

const initialSignupState ={
	email:"",
	password:"",
	mark:0
}
export const signup = (state=initialSignupState,action={}) => {
	switch(action.type){
		case CHANGE_PASSWORD:
			return Object.assign({},state,{password:action.payload});
		case CHANGE_EMAIL:
			return Object.assign({},state,{email:action.payload});
		case CHANGE_MARK:
			return Object.assign({},state,{mark:1});
		case clearStates:
			return Object.assign({},initialSignupState);
		default:
			return state;
	}
}

const initialRegisterState = {
	email:"",
	password:"",
	mark:0,
	name:""

}
export const register = (state=initialRegisterState,action={}) => {
	switch(action.type){
		case CHANGE_RPASSWORD:
			return Object.assign({},state,{password:action.payload});
		case CHANGE_REMAIL:
			return Object.assign({},state,{email:action.payload});
		case CHANGE_RMARK:
			return Object.assign({},state,{mark:action.payload});
		case CHANGE_RNAME:
			return Object.assign({},state,{name:action.payload});
		case registerClear:
			return Object.assign({},initialRegisterState);
		default:
			return state;
	}
}

const initialHomeState = {
	  problem:{},
      route:'contest',
      contestId:"1",
      user : {
        id:"",
        name:"",
        email:"",
        solved:new Set([1]),
        wrong:new Set([2]),
        wrong_arr:[{id:2,name:"rat race"}]
      },
      allProblems:{},
      issignedin:true
    }

export const home = (state=initialHomeState,action={}) => {
	switch(action.type){
		case CHANGE_PROBLEM:
			return Object.assign({},state,{problem:action.payload})
		case CHANGE_ROUTE:
			return Object.assign({},state,{route:action.payload});
		case CHANGE_USER:
			return Object.assign({},state,{user:action.payload});
		case CHANGE_ISSIGNEDIN:
			return Object.assign({},state,{issignedin:action.payload});
		case CHANGE_SEARCH:
			return Object.assign({},state,{allProblems:action.payload});
		case CLEAR_HOME:
			return Object.assign({},initialHomeState);
		default:
			return state;
	}
}


