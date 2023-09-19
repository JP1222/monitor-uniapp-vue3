<template>
  <view class="">
    <uni-section title="节点使用信息" type="line">
      <uni-card title="节点开启情况" :extra="usageRate">
        <text class="uni-body">
          <text>全部节点：{{ countNode }}</text>
          \n
          <text>开启的节点：{{ inTurnOn }}</text>
        </text>
      </uni-card>
    </uni-section>
    <!--    圆环图-->
    <view class="antore-cahrts">
      <qiun-data-charts type="ring" :opts="myOpts" :chartData="circleData"/>
    </view>

    <!--    条形图-->
    <view class="charts-box">
      <qiun-data-charts type="area" :opts="opts" :chartData="chartData"/>
    </view>
  </view>


</template>

<script>
import {
  getNodeCounts
} from "../../api/monitor";

export default {
  mounted() {
    getNodeCounts().then(res => {
      this.inTurnOn = res.body.inTurnOn
      this.countNode = res.body.countNode
      console.log(this.inTurnOn, this.countNode)
    })
  },
  computed: {
    usageRate() {
      let rate = this.countNode !== 0 ? Math.round(this.inTurnOn / this.countNode * 100) : 0
      return `${rate}%`
    }
  },
  data() {
    return {
      inTurnOn: "",
      countNode: "",

      chartData: {},
      circleData: {},
      myOpts: {
        rotate: false,
        rotateLock: false,
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
          "#ea7ccc"],
        padding: [0, 0, 0, 10],
        dataLabel: true,
        legend: {
          show: true,
          position: "right",
          lineHeight: 25
        },
        title: {
          name: "使用率",
          fontSize: 15,
          color: "#666666"
        },
        subtitle: {
          name: this.usageRate,
          // name: '70%',
          fontSize: 25,
          color: "#7cb5ec"
        },
        extra: {
          ring: {
            ringWidth: 60,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }
        }
      },

      //您可以通过修改 config-ucharts.js 文件中下标为 ['area'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
          "#ea7ccc"
        ],
        padding: [15, 15, 0, 15],
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          area: {
            type: "curve",
            opacity: 0.2,
            addLine: true,
            width: 2,
            gradient: true
          }
        }
      },
    };
  },
  onReady() {
    this.cricleGetServerData()

    this.getServerData();
  },
  methods: {
    cricleGetServerData() {
      getNodeCounts().then(response => {
        this.inTurnOn = response.body.inTurnOn
        this.countNode = response.body.countNode
        let res = {
          series: [
            {
              data: [{"name": "开启节点", "value": response.body.inTurnOn}, {
                "name": "全部节点",
                "value": response.body.countNode
              }]
            }
          ]
        };
        this.circleData = JSON.parse(JSON.stringify(res));
      })
    },
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
          series: [{
            name: "灌溉量",
            data: [35, 8, 25, 37, 4, 20]
          },
            {
              name: "控制量",
              data: [70, 40, 65, 100, 44, 68]
            },
            {
              name: "实时量C",
              data: [100, 80, 95, 150, 112, 132]
            }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },

  }
};
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
/*.charts-box {*/
/*  width: 100%;*/
/*  height: 400px;*/
/*}*/

.antore-cahrts {
  width: 100%;
  height: 220px;
}
</style>
