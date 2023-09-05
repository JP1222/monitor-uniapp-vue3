<template>
	<view>
    <view class="uni-header">
<!--      <view class="uni-group hide-on-phone">-->
<!--        <view class="uni-title">{{$t('demo.table.title')}}</view>-->
<!--      </view>-->
      <view class="uni-group">
        <!-- 输入框 -->
        <input class="uni-search" type="text" v-model="searchVal" @confirm="search" placeholder="输入要查询的节点" />
        <!-- 搜索按钮 -->
        <button class="uni-button" type="default" size="mini" @click="search">查询</button>
        <!-- 添加按钮 -->
        <button class="uni-button" type="primary" size="mini">添加</button>
        <!-- 批量删除按钮 -->
        <button class="uni-button" type="warn" size="mini" @click="delTable">批量删除</button>
      </view>
    </view>
    <view class="uni-container">
		<!-- 表格组件 -->
		<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="没有更多数据"
			@selection-change="selectionChange">
			<uni-tr>
				<!-- 表头列 -->
				<uni-th align="center" v-for="(item, index) in options" :key="index">
					{{ item.label }}
				</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key=index>
				<!-- 表格数据列 -->
				<uni-td v-for="(option, index) in options" :key="index">
					<view v-if="option.prop === 'number'">
						{{ item[option.prop] + option.unit }}
<!--						<button class="delete-button" size="mini" type="warn">删除</button>-->
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
			dataInterval: null,
      loading: false
		}
	},
	onLoad() {
		this.getData(1);
		this.selectedIndexs = []
		// this.dataInterval = setInterval(() => {
		// 	this.getData(this.pageCurrent);
		// }, 5000);
	},
	// destroyed() {
	// 	clearInterval(this.dataInterval);
	// },
	methods: {
		// 分页触发
		change(e) {
			this.$refs.table.clearSelection()
			this.selectedIndexs.length = 0
			this.getData(e.current)
		},
		// log(item) {
		// 	console.log(item);
		// },
		getData(pageCurrent) {
			const paramsList = {
				pageNum: pageCurrent,
				pageSize: this.pageSize
			}
			getAllNode(paramsList).then((res) => {
				this.total = res.body.totalSize
				this.tableData = res.body.content
			}).catch((error) => {
				console.error('Error getting all nodes:', error);
			})
		},

	},

}
</script>

<style>
.delete-button {
	float: right;
}

.uni-pagination-box {
	position: fixed;
	bottom: 0;
	width: 100%;
}

</style>
