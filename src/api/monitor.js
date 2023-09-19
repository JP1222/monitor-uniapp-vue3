import {request} from "./http.js"

// ----首页的API----
//获取全部节点数据
export function getAllNode(data) {
    return request({
        url: '/node/all', method: 'GET', data
    })
}

// 首页批量删除
export function deleteByList(data) {
    return request({
        url: `/node/deleteByList`, method: 'POST', timeout: 10000, data
    })
}

//查找节点数据
export function findNodeData(data) {
    return request({
        url: '/node/all/', method: 'GET', data
    })
}



// ---节点控制页面API---
// 删除一个节点
export function deleteNode(data) {
    return request({
        url: '/node/delete/' + data.nodeNumber, method: 'DELETE',
    })
}

// 查找节点
export function searchNode(data) {
    return request({
        url: '/node/' + data.nodeNumber, method: 'GET',
    })
}

export function getAllNodeData(data) {
    return request({
        url: '/node/nodes', method: 'GET', data
    })
}

// 添加一个节点
export function addNode(data) {
    return request({
        url: '/node/nodes', method: 'POST', data
    })
}

// 控制继电器
export function controlNode(data) {
    return request({
        url: `/node/nodes/${data.nodeNumber}/relays/${data.relayNumber}`, method: 'PUT', data: {
            control: data.control
        }
    })
}


//---- 数据展示页面----
// 获取节点使用情况
export function getNodeCounts() {
    return request({
        url: '/node/count', method: 'Get',
    })
}
