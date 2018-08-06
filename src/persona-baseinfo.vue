<template>
  <div>
    <div class="ov">
      <div class="photo"><img :src="infoData.imageUrl" v-if="infoData"></div>
      <div class="info-box">
        <h3>基本信息</h3>
        <div class="ov">
          <div class="info-col">
            <div class="label">姓名：</div>
            <div class="label">手机：</div>
            <div class="label">所属公司：</div>
            <div class="label">职位：</div>
            <div class="label">出生年月：</div>
          </div>
          <div class="info-col info-col2" v-if="infoData">
            <div class="value">{{infoData.lastname}}</div>
            <div class="value">{{infoData.mobile}}</div>
            <div class="value">{{infoData.subCompanyName}}</div>
            <div class="value">{{infoData.jobtitleName}}</div>
            <div class="value">{{infoData.birthday}}</div>
          </div>
          <div class="info-col">
            <div class="label">员工号：</div>
            <div class="label">邮箱：</div>
            <div class="label">所属部门：</div>
            <div class="label">职务：</div>
            <div class="label">员工状态：</div>
          </div>
          <div class="info-col info-col2" v-if="infoData">
            <div class="value">{{infoData.workcode}}</div>
            <div class="value">{{infoData.email}}</div>
            <div class="value">{{infoData.departmentName}}</div>
            <div class="value">{{infoData.jobactivityName}}</div>
            <div class="value">{{infoData.status}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="two-charts">
      <div class="two-chart">
        <gong :lv="analysisData.star"></gong>
      </div>
      <div class="two-chart">
        <chart :infoData="analysisData.scoreJson"></chart>
      </div>
    </div>
  </div>
</template>
<script>
import Gong from '@/components/gong'
import Chart from '@/components/persona-chart-score'
export default {
  components: {
    Gong,
    Chart
  },
  data() {
    return {}
  },
  props: {
    infoData: {
      type: Object
    },
    analysisData: {
      type: Object
    }
  }
}
</script>
<style scoped>
.info-box{
  float: left;
  width: 75%;
}
.photo {
  float: left;
  width: 25%;
  padding: 20px 0;
  text-align: center;
}
.photo img {
  width: 90%;
  max-width: 200px;
}
.ov {
  overflow: hidden;
}
.info-col {
  width: 15%;
  float: left;
}
.info-col.info-col2 {
  width: 30%;
}
.label,.value{
  padding: 15px 0;
  height: 1em;
  border-bottom: 1px solid #ccc;
}
.two-charts {
  background: #eee;
  text-align: center;
  display: flex;
}
.two-chart{
  flex: 1;
  height: 500px;
  margin: 1%;
  background: #fff;
}
.el-tabs .el-tabs__content{
  min-width: 1000px;
}
</style>
