import { request } from "./http.js"

export function getAllNode(data) {
	return request({
		url: '/node/all',
		method: 'GET',
		data
	})
}

// 查找节点
export function searchNode(data) {
	return request({
		url: '/node/' + data.nodeNumber,
		method: 'GET',
	})
}


export function getAllNodeData(data) {
	return request({
		url: '/node/nodes',
		method: 'GET',
		data
	})
}

// 删除一个节点
export function deleteNode(data) {
	return request({
		url: '/node/delete/' + data.nodeNumber,
		method: 'DELETE',
	})
}


// 添加一个节点
export function addNode(data) {
	return request({
		url: '/node/nodes',
		method: 'POST',
		data
	})
}

// 控制继电器
export function controlNode(data) {
	return request({
		url: `/node/nodes/${data.nodeNumber}/relays/${data.relayNumber}`,
		method: 'PUT',
		data: {
			control: data.control
		}
	})
}

export function deleteByList(data){
	return request({
		url: `/node/deleteByList`,
		method: 'POST',
		timeout: 10000,
		data
	})
}

//查找节点数据
export function findNodeData(data){
	return request({
		url:'/node/all/',
		method: 'GET',
		data
	})
}
