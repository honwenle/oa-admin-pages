<template>
  <div>
    <el-tabs v-model="tabName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="tab1">
        <base-info :infoData="tabs.tab1.data" :analysisData="analysisData"></base-info>
      </el-tab-pane>
      <el-tab-pane label="员工历程" name="tab2">
        <course :infoData="tabs.tab2.data"></course>
      </el-tab-pane>
      <el-tab-pane label="绩效情况" name="tab3">
        <performance :infoData="tabs.tab3.data" :code="workCode"></performance>
      </el-tab-pane>
      <el-tab-pane label="人才盘点" name="tab4">
        <chart :infoData="analysisData"></chart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BaseInfo from './persona-baseinfo'
import Course from './persona-course'
import Performance from './persona-performance'
import Chart from './persona-chart'
export default {
  components: {
    BaseInfo,
    Course,
    Performance,
    Chart
  },
  data() {
    return {
      tabName: 'tab1',
      id: this.$route.params.id,
      name: '',
      workCode: '',
      tabs: {
        tab1: {
          api: '/rest/hrmResource/basicInfo',
          data: null
        },
        tab2: {
          api: '/rest/weaver/workFlow/experience',
          data: null
        },
        tab3: {
          api: '/rest/hrmScore',
          data: null
        }
      },
      analysisData: {}
    }
  },
  async mounted() {
    const loading = this.$loading()
    await this.getDetail()
    this.name = this.tabs.tab1.data.lastname
    this.workCode = this.tabs.tab1.data.workcode
    this.getAnalysis()
    loading.close()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: this.tabs[this.tabName].api,
        params: {
          id: this.id
        }
      })
      if (data.code == 200) {
        this.tabs[this.tabName].data = data.data
      }
    },
    async getAnalysis() {
      let {data} = await this.$http({
        url: '/rest/hrmExamination',
        params: {
          name: this.name
        }
      })
      if (data.code == 200) {
        if (data.data) {
          data.data.scoreJson = JSON.parse(data.data.scoreJson)
          this.analysisData = data.data
        }
      }
    },
    handleClick(tab, event) {
      if (this.tabName != 'tab4' && this.tabs[this.tabName].data === null) {
        this.getDetail()
      }
    }
  }
}
</script>
