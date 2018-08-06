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
        prop="lastname"
        label="名字"/>
      <el-table-column
        prop="workcode"
        label="员工编号"/>
      <el-table-column
        prop="mobile"
        label="联系方式"/>
      <el-table-column
        prop="subcompanyname"
        label="所属公司"/>
      <el-table-column
        prop="departmentmark"
        label="所属部门"/>
      <el-table-column
        width="250px"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showChange(scope.row.id)" size="small" type="primary">异动</el-button>
          <el-button @click="showQuit(scope.row.id)" size="small" type="primary">离职</el-button>
          <el-button @click="goPersona(scope.row.id)" size="small" type="primary">员工画像</el-button>
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
    <el-dialog title="异动信息" :visible.sync="isShowChange" width="90%">
      <change-form @form-close="renewData" :id="id" :key="id" :userData="userInfo"></change-form>
    </el-dialog>
    <el-dialog title="离职信息" :visible.sync="isShowQuit" width="70%">
      <quit-form @form-close="renewData" :key="id" :id="id" :userData="userInfo"></quit-form>
    </el-dialog>
  </div>
</template>
<script>
import ChangeForm from './change-form'
import QuitForm from './quit-form'
export default {
  components: {
    ChangeForm,
    QuitForm
  },
  data() {
    return {
      tableData: {},
      currentPage: 1,
      pageSize: 25,
      isShowChange: false,
      isShowQuit: false,
      id: 0,
      userInfo: {},
      keyword: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    goPersona(id) {
      this.$router.push({
        name: 'Persona',
        params: {
          id: id
        }
      })
    },
    renewData() {
      this.isShowChange = false
      this.isShowQuit = false
      this.getList()
    },
    showChange(id) {
      this.id = id
      this.getUserInfo()
      this.isShowChange = true
    },
    showQuit(id) {
      this.id = id
      this.getUserInfo()
      this.isShowQuit = true
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
        url: '/rest/hrmResource/all',
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
