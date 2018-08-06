<template>
  <div class="poa">
    <div class="poa-left">
      <div class="">
        <div class="poa-left-photo">
          <img :src="jobData.imageUrl" alt="">
        </div>
        <div class="poa-left-name">{{jobData.lastname}}</div>
      </div>
      <div class="poa-left-block" :class="{'first': i == 0}" v-for="(block, i) in leftFieldList" :key="i">
        <div class="poa-left-row" v-for="item in block" :key="item.label">
          <div class="poa-left-label">{{item.label}}：</div>
          <div class="poa-left-value">{{jobData[item.field]}}</div>
        </div>
      </div>
    </div>
    <div class="poa-right">
      <el-button class="bt-print" type="primary" v-if="$route.query.isprint != 1" @click="openprint" icon="el-icon-printer">打印</el-button>
      <div class="poa-right-block">
        <div class="poa-right-title">
          <div class="poa-icon poa-icon-job"></div>
          岗位信息
          <span>JOB INFORMATION</span>
        </div>
        <div class="poa-right-box">
          <div class="poa-right-row" v-for="item in rightFieldList" :key="item.label">
            <div class="poa-right-label">{{item.label}}：</div>
            <div class="poa-right-value">{{jobData[item.field]}}</div>
          </div>
        </div>
      </div>
      <div class="poa-right-block">
        <div class="poa-right-title">
          <div class="poa-icon poa-icon-his"></div>
          历史数据
          <span>HISTORICAL DATA</span></div>
        <div class="poa-right-box">
          <div class="poa-his-row" v-for="(item, i) in hisData" :key="i">
            <div class="poa-his-label">{{item.createDate}}</div>
            <div class="poa-his-value">{{item.workflowName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      jobData: {},
      hisData: [],
      leftFieldList: [
        [
          { label: '员工编号', field: 'loginid' },
          { label: '出生年月', field: 'birthday' },
          { label: '性别', field: 'sex' },
          { label: '年龄', field: 'years' },
          { label: '民族', field: 'folk' },
          { label: '籍贯', field: 'nativeplace' }
        ], [
          { label: '婚否', field: 'maritalstatus' },
          { label: '身高', field: 'height' },
          { label: '体重', field: 'weight' },
          { label: '手机号码', field: 'mobile' },
          { label: '服务年限', field: 'serviceOfYear' },
          { label: '学历', field: 'education' }
        ], [
          { label: '毕业院校', field: 'school' },
          { label: '专业', field: 'major' },
          { label: '家庭住址', field: 'address' },
          { label: '驾驶证', field: 'driverLicense' },
          { label: '技能证书', field: 'certificate' },
          { label: '兴趣爱好', field: 'hobby' },
          { label: '特长', field: 'xxx' }
        ]
      ],
      rightFieldList: [
        { label: '公司', field: 'subcompany' },
        { label: '部门', field: 'department' },
        { label: '职位', field: 'jobactivitymark' },
        { label: '职级', field: 'jobtitle' },
        { label: '入职时间', field: 'createdate' },
        { label: '工作内容', field: 'xxx' },
        { label: '直接上级', field: 'manager' },
        { label: '上级评价', field: 'xxx' }
      ]
    }
  },
  async mounted() {
    await this.getJobDetail()
    await this.getHisDetail()
    if (this.$route.query.isprint == 1) {
      window.print()
    }
  },
  methods: {
    openprint() {
      window.open(location.href + '?isprint=1')
    },
    async getJobDetail() {
      let {data} = await this.$http('rest/hrmResource/oa/' + this.id)
      if (data.code == 200) {
        this.jobData = data.data
      }
    },
    async getHisDetail() {
      let {data} = await this.$http('rest/weaver/workFlow/oa/' + this.id)
      if (data.code == 200) {
        this.hisData = data.data
      }
    }
  }
}
</script>
<style scoped>
.bt-print{
  position: fixed;
  top: 10px;
  right: 10px;
}
.poa{
  overflow: hidden;
  width: 1000px;
}
.poa-left,.poa-right{
  float: left;
  box-sizing: border-box;
}
.poa-left{
  width: 295px;
  background: #409eff;
  color: #fff;
}
.poa-right{
  width: 705px;
  padding: 0 30px;
}
.poa-left-label,.poa-left-value,.poa-right-label,.poa-right-value,.poa-his-label,.poa-his-value{
  display: inline-block;
}
.poa-left-photo {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  background: #fff;
  margin: 64px auto 28px;
  border: 14px solid;
  box-sizing: border-box;
}
.poa-left-photo img{
  width: 100%;
  margin-top: -30px;
}
.poa-left-block {
  padding: 20px 0 20px 55px;
}
.poa-left-name{
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
}
.poa-left-block.first{
  border-top: 1px solid;
  padding-top: 30px;
}
.poa-left-block{
  border-top: 1px dashed;
  font-size: 16px;
}
.poa-left-row{
  padding: 10px 0;
}
.poa-left-label{
  width: 80px;
}
.poa-left-value {
  width: 150px;
  vertical-align: text-top;
}
.poa-right-block{
  margin-top: 80px;
}
.poa-right-title{
  color: #409eff;
  font-size: 24px;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin-bottom: 40px;
  position: relative;
}
.poa-right-title:after {
  content: '';
  display: block;
  width: 96px;
  height: 3px;
  background: #409eff;
  position: absolute;
  bottom: -2px;
}
.poa-right-title span{
  font-size: 15px;
}
.poa-icon{
  display: inline-block;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  vertical-align: text-top;
  width: 30px;
  height: 30px;
}
.poa-icon.poa-icon-job{
  background-image: url('./images/icon-job.png');
}
.poa-icon.poa-icon-his{
  background-image: url('./images/icon-his.png');
}
.poa-right-box {
  font-size: 16px;
  color: #666;
  padding: 0 12px;
}
.poa-right-row {
  padding: 10px 0;
  margin-bottom: 10px;
}
.poa-right-label {
  width: 118px;
}
.poa-right-row:nth-child(even) {
  background: #fcfcfc;
}
.poa-his-label {
  background: #7bbcff;
  color: #fff;
  width: 88px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  margin-right: 15px;
}
.poa-his-value {
  position: relative;
  padding-left: 28px;
  height: 90px;
}
.poa-his-value:before {
  content: '';
  position: absolute;
  width: 11px;
  height: 11px;
  background: #7bbcff;
  border-radius: 50%;
  left: 0;
  top: 6px;
  z-index: 1;
}
.poa-his-value:after {
  content: '';
  position: absolute;
  left: 5px;
  width: 1px;
  height: 90px;
  background: #ebf5ff;
  top: 10px;
}
</style>
