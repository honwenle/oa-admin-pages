<template>
  <div>
    <div class="buttons">
      <el-input v-model="keyword" placeholder="输入搜索关键字" style="width: 200px" size="small"></el-input>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="getList">查询</el-button>
    </div>
    <el-table
      :data="tableData.data"
      border
      style="width: 100%">
      <el-table-column
        prop="departmentmark"
        label="部门"/>
      <el-table-column
        prop="lastname"
        label="姓名"/>
      <el-table-column
        prop="fstatus"
        label="状态">
        <template slot-scope="scope">
          <div :style="'color:#' + (scope.row.isremark == '4' ? '67C23A' : 'F56C6C')">{{scope.row.fstatus}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="applydate"
        label="异动操作时间"/>
      <el-table-column
        prop="effectdate"
        label="异动生效时间"/>
      <el-table-column
        prop="mobile"
        label="联系方式"/>
      <el-table-column
        prop="workflowname"
        label="异动类型"/>
    </el-table>
    <div style="height: 20px" />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[25, 50, 75, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.count" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: {},
      currentPage: 1,
      pageSize: 25,
      keyword: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const loading = this.$loading()
      let {data} = await this.$http({
        url: '/rest/hrmResource/employeeTurnOverList',
        params: {
          page: this.currentPage,
          size: this.pageSize,
          name: this.keyword
        }
      })
      if (data.code == 200) {
        this.tableData = data.data
      }
      loading.close()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getList()
    }
  }
}
</script>
