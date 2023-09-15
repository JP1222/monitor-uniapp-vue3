<template>
	<view>
    <view class="uni-header">
<!--      <view class="uni-group hide-on-phone">-->
<!--        <view class="uni-title">{{$t('demo.table.title')}}</view>-->
<!--      </view>-->
      <view class="uni-group">
        <!-- 输入框 -->
        <input class="uni-search" type="text" v-model="searchVal" @confirm="search" placeholder="输入要查询的节点" />
        <!-- 查询按钮 -->
        <button class="uni-button" type="default" size="mini" @click="search">查询</button>
        <!-- 添加按钮 -->
<!--        <button class="uni-button" type="primary" size="mini">添加</button>-->
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
				<uni-th class="uni-head" align="center" v-for="(item, index) in options" :key="index">
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
<!--          节点控制-->
          <view v-else-if="option.prop === 'action'">
            <switch checked @change="switch1Change($event, item)" />
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
  searchNode,
  deleteByList,
  findNodeData
} from '../../api/monitor.js'
import { options } from './options.js'

export default {
	data() {
		return {
      searchVal: '',
			// 每页数据量
			pageSize: 11,
			// 当前页
			pageCurrent: 1,
			// 数据总量
			total: 0,
			options: options,
			tableData: [],
			dataInterval: null,
      loading: false,
      //多选初始化
      selectedIndexs: []
    }
	},
	onLoad() {
		this.getData(1);
		this.selectedIndexs = []
	},

	methods: {
    //节点控制
    switch1Change(e, rowData){
      console.log(e.detail)
      console.log(rowData)
    },

    // 多选处理
    selectedItems() {
      return this.selectedIndexs.map(i => this.tableData[i].number)
    },

    // 多选事件处理函数
    selectionChange(e) {
      console.log('选中的索引', this.selectedIndexs)
      this.selectedIndexs = e.detail.index
    },

    // 批量删除函数
    delTable() {
      const items = this.selectedItems();
      console.log('选中的节点',items)
      deleteByList(items).then((res) => {
        this.getData(this.pageCurrent);
        this.$refs.table.clearSelection() //清除选中
      }).catch((error) => {
        console.log('deleteByList error', error)
      })
    },

    //搜索单个节点数据，如果没输入节点默认刷新页面
    search(){
      if (this.searchVal === ''){
        this.getData(1);
        return
      }
      const paramsList = {
        pageNum: 1,
        pageSize: this.pageSize,
        number: this.searchVal
      }
      findNodeData(paramsList).then((res) => {
        console.log(res)
        this.total = res.body.totalSize
        this.tableData = res.body.content
      }).catch((error) => {
        console.error('searchNode error' , error)
      })
    },

		// 分页触发
		change(e) {
			this.$refs.table.clearSelection()
			this.selectedIndexs.length = 0
			this.getData(e.current)
		},

    //获取全部节点数据
		getData(pageCurrent) {
			const paramsList = {
				pageNum: pageCurrent,
				pageSize: this.pageSize
			}
			getAllNode(paramsList).then((res) => {
        console.log(res.body)
				this.total = res.body.totalSize
				this.tableData = res.body.content
			}).catch((error) => {
				console.error('Error getting all nodes:', error);
			})
		},

	},

}
</script>

<style lang="scss">
.delete-button {
	float: right;
}

.uni-pagination-box {
	position: fixed;
	bottom: 0;
	width: 100%;
}

.uni-group {
  display: flex;
  justify-content: center;  // 水平居中
  align-items: center;      // 垂直居中
  flex-wrap: wrap;          // 允许元素换行，适用于小屏幕或者当元素宽度超出容器宽度时
  margin: 5px;
}

.uni-search {
  width: 100%;
  border: 1px;
  margin-bottom: 10px;
  padding: 10px;
  margin: 5px;
  background-color:rgb(241, 241, 241);
}

</style>
