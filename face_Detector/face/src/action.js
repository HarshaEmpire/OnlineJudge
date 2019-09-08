import {CHANGE_PASSWORD,CHANGE_EMAIL,CHANGE_MARK,CHANGE_RNAME,CHANGE_RPASSWORD,CHANGE_REMAIL,CHANGE_RMARK,clearStates,registerClear,CHANGE_PROBLEM
,CHANGE_ROUTE,CHANGE_USER,CHANGE_ISSIGNEDIN,CLEAR_HOME,ON_CLICK_CHANGE,CHANGE_SEARCH,CHANGE_CONTEST,LOAD_KEY} from "./constants"


export const onPasswordChange = (text) => ({
	type: CHANGE_PASSWORD,
	payload:text
});
export const onEmailChange = (text) => ({
	type: CHANGE_EMAIL,
	payload:text
});
export const onMarkChange = (val) => ({
	type:CHANGE_MARK,
	payload:val
});
export const clearState = () => ({
	type:clearStates

});


export const onRPasswordChange = (text) => ({
	type: CHANGE_RPASSWORD,
	payload:text
});
export const onREmailChange = (text) => ({
	type: CHANGE_REMAIL,
	payload:text
});
export const onRMarkChange = (val) => ({
	type:CHANGE_RMARK,
	payload:val
});
export const onRNameChange = (text)=> ({
	type:CHANGE_RNAME,
	payload:text
});
export const clearRegister = () => ({
	type:registerClear
})


export const onRouteChange = (text) => ({
	type: CHANGE_ROUTE,
	payload:text
});
export const onUserChange = (user) => ({
	type: CHANGE_USER,
	payload:user
});
export const isSignedChange = (val) => ({
	type: CHANGE_ISSIGNEDIN,
	payload:val

});
export const LoadKey = (val) => ({
	type: LOAD_KEY,
	payload:val

});
export const clearHome = () => ({
	type:CLEAR_HOME
})
export const problemChange = (data) =>({
	type: CHANGE_PROBLEM,
	payload:data
})
export const searchChange = (data) =>({
	type: CHANGE_SEARCH,
	payload:data
})
export const contestChange =(val)=>({
	type: CHANGE_CONTEST,
	payload:val
})

export const clickChange = (text) => ({
	type:ON_CLICK_CHANGE,
	payload:text
})