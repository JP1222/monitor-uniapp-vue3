<template>
	<view>

		<uni-section title="节点编号" type="line" padding>
			<view class="btn-container">
				<uni-easyinput v-model="nodeNumberAdd" focus placeholder="请输入节点编号"></uni-easyinput>

				<view class="btn " @click="handleAddNode">
					添加节点
				</view>
			</view>
		</uni-section>

		<uni-section title="查找节点" type="line" padding>
			<view class="btn-container">
				<uni-easyinput v-model="nodeNumberSea" focus placeholder="请输入节点编号"></uni-easyinput>

				<view class="btn" @click="handleSearch">
					查找节点
				</view>
			</view>
		</uni-section>



		<view class="" v-for="item in nodeList" :key="item.nodeNumber">
			<view class="title-container">
				<view class="title">
					{{ item.nodeNumber }}
				</view>

				<view class="btn" @click="handleDeleteNode(item.nodeNumber)">
					删除节点
				</view>
			</view>

			<uni-table border stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">继电器编号</uni-th>
					<uni-th align="center">控制状态</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(relay, index) in item.relays" :key="index">
					<uni-td>{{ relay.relayNumber }}</uni-td>
					<uni-td>
						<switch :checked="relay.control" :stopChange="true" @change="handleClickControl(item, relay)">
						</switch>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
import {
	addNode,
	getAllNodeData,
	deleteNode,
	controlNode,
	searchNode
} from '../../api/monitor.js'
export default {
	components: {},
	data() {
		return {
			nodeNumberAdd: "",
			nodeNumberSea: "",
			nodeList: []
		}
	},
	onLoad() {
		this.getInfo()
	},
	methods: {
		handleAddNode() {
			addNode({
				nodeNumber: this.nodeNumberAdd
			}).then(res => {
				console.log(res);
				if (res.success) {
					uni.showToast({
						title: '添加成功!',
						icon: 'success'
					})
					this.nodeNumberAdd = ""
					this.getInfo()
				}
			})
		},
		handleSearch() {
			this.nodeList = []
			searchNode({
				nodeNumber: this.nodeNumberSea
			}).then(res => {
				console.log(res);
				this.nodeList.push(
					res.body
				)
				if (res.success) {
					uni.showToast({
						title: '搜索成功!',
						icon: 'success'
					})
					this.nodeNumberSea = ""
				}
			})
		},
		getInfo() {
			getAllNodeData().then(res => {
				console.log(res);
				this.nodeList = JSON.parse(JSON.stringify(res.body.content))
			})
		},
		handleDeleteNode(nodeNumber) {
			//使用了uni.showModal的回调方式。在这种回调内，this 可能不再指向Vue的实例，导致无法正常访问到 this.getInfo 方法。
			// 使用了箭头函数 (res) => { ... } 作为 uni.showModal 中 success 的回调函数。因为箭头函数不会绑定它自己的 this，所以它会从定义它的上下文（在这里是 handleDeleteNode 方法）继承 this。这意味着在箭头函数内部，this 依然是指向 Vue 的实例
			uni.showModal({
				title: "请确认是否删除该节点",
				success: (res) => {
					if (res.confirm) {
						deleteNode({
							nodeNumber
						}).then(res => {
							this.getInfo()
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			})
		},

		handleClickControl(item, relay) {
			console.log(item, relay);
			controlNode({
				nodeNumber: item.nodeNumber,
				relayNumber: relay.relayNumber,
				control: !relay.control
			}).then(res => {
				relay.control = !relay.control
				console.log(res);
				this.getInfo()

				//请求成功提示
				uni.showToast({
					title: '控制成功',
					icon: 'success',
				})
			}).catch(error => {
				console.log('控制节点错误提示:' + error)
				//请求失败提示
				uni.showToast({
					title: '控制失败',
					icon: 'error',
				})
				this.getInfo()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.btn-container {
	padding-top: 5px;
	display: flex;
	padding-bottom: 10px;

	.btn {
		letter-spacing: 2px;
		width: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
		background-color: rgb(247, 247, 247);
		border: 1px solid rgb(198, 198, 203);
	}
}

.title-container {
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 10px;

	.title {
		font-weight: bold;
	}

	.btn {
		color: white;
		background-color: rgb(244, 108, 108);
		padding: 5px 10px;
	}
}
</style>
