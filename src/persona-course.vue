<template>
  <div>
    <el-steps :space="100" v-if="infoData" :active="infoData.length-1">
      <el-step
        style="flex-basis: 150px;margin-bottom: 30px;"
        v-for="item in infoData"
        :key="item.requestId"
        :title="item.workflowName"
        :description="'生效时间' + item.createDate" />
    </el-steps>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    infoData: {
      type: Array
    }
  }
}
</script>
<style>
.el-steps{
  flex-wrap: wrap;
}
</style>
