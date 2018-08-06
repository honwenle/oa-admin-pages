<template>
  <div class="recruit-wrap">
    <el-row type="flex">
      <el-col>
        <div class="top-icon"><div class="icon icon-ypz"></div>应聘者</div>
      </el-col>
      <el-col>
        <div class="top-icon"><div class="icon icon-rlzyb"></div>人力资源部</div>
      </el-col>
      <el-col>
        <div class="top-icon"><div class="icon icon-oaxt"></div>OA系统</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" class="dash dash-1">
        <el-badge :value="0">
          <el-button type="primary" plain>投递简历</el-button>
        </el-badge>
      </el-col>
      <el-col :span="8" class="dash dash-2">
        <el-badge :value="badgeData.noInterview">
          <el-button @click="goList('InterviewList0')" type="warning" plain>邀约情况</el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8" class="dash dash-1">
        <el-badge :value="0">
          <el-button type="info" plain>填写求职信息</el-button>
        </el-badge>
      </el-col>
      <el-col :span="8" class="dash dash-4">
        <el-badge :value="badgeData.inInterview">
          <el-button @click="goList('InterviewList2', 1)" type="warning" plain>面试中</el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8" class="dash dash-5">
        <el-badge :value="badgeData.interviewResult">
          <el-button @click="goList('InterviewList2')" type="warning" plain>面试信息情况汇总</el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" class="dash dash-6">
        <el-badge :value="0">
          <el-button type="primary" plain>完善入职信息</el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8" class="dash dash-2">
        <el-badge :value="badgeData.audit">
          <el-button @click="goList('InterviewList3')" type="warning" plain>信息审核</el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8" class="dash dash-1">
        <el-badge :value="0">
          <el-button type="info" plain>入职办理</el-button>
        </el-badge>
      </el-col>
      <el-col :span="8">
        <el-badge :value="0">
          <el-button @click="goList('InternList')" type="danger" plain>信息归档</el-button>
        </el-badge>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      badgeData: {}
    }
  },
  mounted() {
    this.getBadge()
  },
  methods: {
    async getBadge() {
      let {data} = await this.$http({
        url: '/rest/resource/list/count'
      })
      if (data.code == 200) {
        this.badgeData = data.data[0]
      }
    },
    goList(route, _in = 0) {
      this.$router.push({
        name: route,
        query: {
          in: _in
        }
      })
    }
  }
}
</script>
<style>
.recruit-wrap{
  text-align: center;
}
.el-col{
  padding: 50px 0;
  position: relative;
}
.el-col.dash::after {
  content: '';
  display: block;
  border-bottom-width: 0;
  border-left-width: 0;
  border-top-width: 0;
  border-right-width: 0;
  border-style: dashed;
  border-color: #aaa;
  position: absolute;
  z-index: -1;
  box-sizing: border-box;
  width: 100%;
}
.el-col.dash.dash-1::after{
  top: 50%;
  border-top-width: 3px;
  border-bottom-width: 0;
  right: -50%;
}
.el-col.dash.dash-2::after {
  height: 100%;
  left: 50%;
  border-left-width: 3px;
}
.el-col.dash.dash-4::after {
  height: 100%;
  border-right-width: 3px;
  border-bottom-width: 3px;
  left: -50%;
  top: 50%;
  border-radius: 15px;
}
.el-col.dash.dash-5::after {
  height: 100%;
  border-left-width: 3px;
  border-top-width: 3px;
  left: -50%;
  top: 50%;
  border-radius: 15px;
}
.el-col.dash.dash-6::after {
  border-top-color: #409eff;
  border-right-color: #409eff;
  height: 100%;
  border-width: 3px;
  left: 50%;
  top: 50%;
  border-radius: 15px;
}
.el-col.dash::before {
  content: '';
  position: absolute;
  background: url('./images/arrow.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 15px;
  height: 12px;
}
.el-col.dash-1::before {
  top: 50%;
  right: 0;
  margin-top: -5px;
}
.el-col.dash-2::before {
  bottom: 0;
  left: 50%;
  transform: rotate(90deg);
  margin-left: -6px;
}
.el-col.dash-4::before {
  top: 150%;
  left: 0;
  margin-top: -7px;
  transform: rotate(180deg);
}
.el-col.dash-5::before {
  top: 50%;
  left: 0;
  margin-top: -5px;
  transform: rotate(180deg);
}
.el-col.dash-6::before {
  top: 150%;
  right: 0;
  margin-top: -7px;
}
.top-icon{
  width: 130px;
  height: 130px;
  margin: auto;
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
.top-icon .icon{
  height: 80px;
  background-position: center center;
  background-repeat: no-repeat;
}
.top-icon .icon.icon-ypz{
  background-image: url('./images/icon-ypz.png');
}
.top-icon .icon.icon-rlzyb{
  background-image: url('./images/icon-rlzyb.png');
}
.top-icon .icon.icon-oaxt{
  background-image: url('./images/icon-oaxt.png');
}
</style>
