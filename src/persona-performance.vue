<template>
  <div>
    <div class="buttons">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus-outline"
        @click="addRecord">添加绩效记录</el-button>
    </div>
    <div class="year-perform" v-for="(table, i) in infoData" v-if="infoData" :key="i">
      <div class="year-title">
        <el-input v-model="table.year" style="width:150px"><template slot="append">年</template></el-input>
      </div>
      <table>
        <thead>
          <tr>
            <td v-for="(title, i) in ['第一季度', '第二季度', '第三季度', '第四季度', '操作']" :key="i">{{title}}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><el-input v-model="table.quarterScoreA" /></td>
            <td><el-input v-model="table.quarterScoreB" /></td>
            <td><el-input v-model="table.quarterScoreC" /></td>
            <td><el-input v-model="table.quarterScoreD" /></td>
            <td><el-button type="primary" size="mini" @click="saveRecord(i)">保存</el-button></td>
          </tr>
        </tbody>
      </table>
    </div>
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
    },
    code: {
      type: String
    }
  },
  methods: {
    addRecord() {
      this.infoData.push({
        year: 0,
        quarterScoreA: 0,
        quarterScoreB: 0,
        quarterScoreC: 0,
        quarterScoreD: 0,
        loginId: this.code
      })
    },
    async saveRecord(i) {
      let {data} = await this.$http({
        method: 'post',
        url: '/rest/hrmScore',
        data: this.infoData[i]
      })
      if (data.code == 200) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.infoData[i] = data.data
      } else {
        this.$message.error(data.message);
      }
    }
  }
}
</script>
<style>
.year-perform{
  margin-bottom: 50px;
}
</style>
