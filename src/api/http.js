const baseUrl = "http://47.114.81.63:8081"

export const request = (params) => {
	return new Promise((resolve,reject) => {
		
		uni.request({
			url:baseUrl + params.url,
			method:params.method || 'GET',
			data:params.data || {},
			params:params.params,
			header:params.header,
			success: (res) => {
				uni.showToast({
					
				})
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
