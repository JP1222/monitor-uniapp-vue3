<template>
	<view style="height: 100%;">
		<uni-table border stripe>
			<uni-tr>
				<uni-th align="center" v-for="(item, index) in options" :key="index" emptyText="暂无更多数据">
					{{ item.label }}
				</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key=index>
				<uni-td v-for="(option, index) in options" :key="index">
					<view v-if="option.prop === 'delete'">
						<button class="uni-button" size="mini" type="warn">删除</button>
					</view>
					<view v-else>
						{{ item[option.prop] + option.unit }}
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>
		<view class="uni-pagination-box">
			<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" />
		</view>
	</view>
</template>

<script>
import {
	getAllNode,
} from '../../api/monitor.js'
import { options } from './options.js'

export default {
	data() {
		return {
			// 每页数据量
			pageSize: 11,
			// 当前页
			pageCurrent: 1,
			// 数据总量
			total: 0,
			options: options,
			tableData: [],
			dataInterval: null
		}
	},
	methods: {
		// 分页触发
		change(e) {
			this.$refs.table.clearSelection()
			this.selectedIndexs.length = 0
			this.getData(e.current)
		},
		log(item) {
			console.log(item);
		},
		getData(pageCurrent) {
			console.log('12321');
			const paramsList = {
				pageNum: this.pageCurrent,
				pageSize: this.pageSize
			}
			getAllNode(paramsList).then((res) => {
				this.total = res.body.totalSize
				console.log(res.body.content)
				this.tableData = res.body.content
			}).catch((error) => {
				console.error('Error getting all nodes:', error);
			})
		},

	},
	mounted() {
		this.getData(1);
		this.dataInterval = setInterval(() => {
			this.getData(this.pageCurrent);
		}, 5000);
	},
	destroyed() {
		clearInterval(this.dataInterval);
	},
}
</script>

<style></style>
