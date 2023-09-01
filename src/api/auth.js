import  {request}  from "./http.js"

export function login(data){
	return request({
		url:'/user/login',
		method:'POST',
		data,
		header:{
			"Content-Type":"application/x-www-form-urlencoded"
		}
	})
}