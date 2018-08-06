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
        prop="workcode"
        label="编号"/>
      <el-table-column
        prop="lastname"
        label="姓名"/>
      <el-table-column
        prop="mobile"
        label="电话"/>
      <el-table-column
        prop="subcompanyname"
        label="公司"/>
      <el-table-column
        prop="departmentmark"
        label="部门"/>
      <el-table-column
        prop="createdate"
        label="入职日期"/>
      <el-table-column
        prop="regularDate"
        label="转正日期"/>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showForm(scope.row.id)" size="small" type="primary">转正</el-button>
        </template>
      </el-table-column>
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
    <el-dialog title="试用人员信息" :visible.sync="isShowForm" width="70%">
      <intern-form @intern-form-close="renewData" :id="id" :userData="userInfo"></intern-form>
    </el-dialog>
  </div>
</template>
<script>
import InternForm from './intern-form'
export default {
  components: {
    InternForm
  },
  data() {
    return {
      id: 0,
      tableData: {},
      currentPage: 1,
      pageSize: 25,
      isShowForm: false,
      userInfo: {},
      keyword: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    renewData() {
      this.isShowForm = false
      this.getList()
    },
    showForm(id) {
      this.id = id
      this.getUserInfo()
      this.isShowForm = true
    },
    async getUserInfo() {
      let {data} = await this.$http({
        url: '/rest/workflow/regular',
        params: {
          id: this.id
        }
      })
      if (data.code == 200) {
        this.userInfo = data.data
      }
    },
    async getList() {
      const loading = this.$loading()
      let {data} = await this.$http({
        url: '/rest/hrmResource/internList',
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
