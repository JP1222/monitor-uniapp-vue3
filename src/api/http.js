// const baseUrl = "http://47.114.81.63:8081"
const baseUrl = "https://www.dpmonitor.top:8082"

export const request = (params) => {
	return new Promise((resolve,reject) => {

		uni.request({
			url:baseUrl + params.url,
			method:params.method || 'GET',
			data:params.data || {},
			params:params.params,
			header:params.header,
			timeout: params.timeout,
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
