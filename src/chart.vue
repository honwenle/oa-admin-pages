<template>
  <div class="chart">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>员工异动数据统计</span>
          </div>
          <el-date-picker
            class="month-input"
            v-model="month"
            size="small"
            type="month"
            placeholder="请选择年月"
            @change="getChangeData">
          </el-date-picker>
          <e-charts :options="options1"></e-charts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>公司人员占比</span>
          </div>
          <e-charts :options="options2"></e-charts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>测评星级九宫格比例</span>
          </div>
          <e-charts :options="options3"></e-charts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
export default {
  components: {
    ECharts
  },
  data() {
    return {
      month: new Date(),
      options1: {
        // title: {
        //   text: '员工异动数据统计'
        // },
        color: ['#2DC7C9'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : {
          name: '类型',
          type : 'category',
          data : ['入职', '转正', '调岗', '调级', '调薪', '离职']
        },
        yAxis : {
          name: '人数',
          type : 'value'
        },
        series : {
          name:'人数',
          type:'bar',
          barWidth: '50%',
          data:[]
        }
      },
      options2: {
        // title: {
        //   text: '公司人员占比',
        //   x: 'center'
        // },
        color: ['#2DC7C9','#B6A2E1'],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data:['试用期员工','正式员工']
        },
        series: {
          name:'人数',
          type:'pie',
          radius: ['50%', '70%'],
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          data:[
          ]
        }
      },
      options3: {
        // title: {
        //   text: '测评星级九宫格比例'
        // },
        color: ['#2DC7C9'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : {
          name: '星级',
          type : 'category',
          data : ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        yAxis : {
          name: '人数',
          type : 'value'
        },
        series : {
          name:'人数',
          type:'bar',
          barWidth: '50%',
          data:[]
        }
      }
    }
  },
  mounted() {
    this.getChangeData()
    this.getPercent()
    this.getGongStar()
  },
  methods: {
    async getChangeData() {
      let {data} = await this.$http({
        url: '/rest/weaver/workFlow/hrmStatistics',
        params: {
          date: new Date(this.month).getTime()
        }
      })
      if (data.code == 200) {
        this.options1.series.data = data.data
      }
    },
    async getPercent() {
      let {data} = await this.$http('/rest/hrmResource/percent')
      if (data.code == 200) {
        this.options2.series.data = data.data
      }
    },
    async getGongStar() {
      let {data} = await this.$http('/rest/hrmExamination/star')
      if (data.code == 200) {
        this.options3.series.data = data.data
      }
    }
  }
}
</script>
<style scoped>
.chart{
  background: #eee;
  padding: 20px;
}
.el-col{
  margin-bottom: 20px;
}
.month-input{
  position: absolute;
  left: 300px;
  z-index: 1;
}
</style>
