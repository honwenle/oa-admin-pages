<template>
  <div>
    <div class="buttons">
      <el-cascader
        filterable
        clearable
        size="small"
        placeholder="选择部门"
        v-model="departmentArr"
        :options="subCompanyList"
        @active-item-change="getDepartmentList"
      ></el-cascader>
      <el-date-picker
        size="small"
        v-model="overtimeBeginDate"
        type="datetime"
        placeholder="选择开始加班时间">
      </el-date-picker>
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
      height="800"
      style="width: 100%">
      <el-table-column
        width="250"
        prop="departmentName"
        label="部门"/>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <div :style="'color:#' + (scope.row.status == '异常' ? 'F56C6C' : '606266')">{{scope.row.status}}</div>
        </template>
      </el-table-column>
      <el-table-column
        :formatter="YYYYMMDDHHmm"
        width="150"
        prop="overtimeApplyDate"
        label="加班申请时间"/>
      <el-table-column
        width="160"
        prop="overtimeBeginDate"
        label="加班开始时间"/>
      <el-table-column
        width="160"
        prop="overtimeEndDate"
        label="加班结束时间"/>
      <el-table-column
        width="160"
        prop="clockBeginDate"
        label="打卡开始时间"/>
      <el-table-column
        width="160"
        prop="clockEndDate"
        label="打卡结束时间"/>
      <el-table-column
        width="80"
        prop="overtimeCount"
        label="加班时长"/>
      <el-table-column
        width="80"
        prop="mealAllowance"
        label="餐补"/>
      <el-table-column
        width="200px"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showClockRecord(scope.row.name, scope.row.overtimeBeginDate)" size="small" type="primary">查看打卡记录</el-button>
          <el-button @click="deleteClick(scope.row.id)" size="small" type="danger">删除</el-button>
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
    <el-dialog title="打卡记录" :visible.sync="isShowRecord">
      <div class="ov">
        <span v-if="clockRecord.length == 0">暂无记录</span>
        <div class="half" v-for="(item, i) in clockRecord" :key="i">{{item}}</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  components: {
  },
  data() {
    return {
      tableData: {},
      currentPage: 1,
      pageSize: 25,
      keyword: '',
      overtimeBeginDate: '',
      departmentArr: [],
      subCompanyList: [],
      isShowRecord: false,
      clockRecord: []
    }
  },
  mounted() {
    this.getList()
    this.getSubCompanyList()
  },
  methods: {
    YYYYMMDDHHmm(row, col, val) {
      return moment(val).format('YYYY-MM-DD HH:mm')
    },
    async showClockRecord(name, date) {
      let {data} = await this.$http({
        url: '/rest/clockRecord/around',
        params: {
          name: name,
          date: new Date(date).getTime()
        }
      })
      if (data.code == 200) {
        this.clockRecord = data.data
        this.isShowRecord = true
      } else {
        this.$message(data.message)
      }
    },
    async getDepartmentList(arr) {
      let {data} = await this.$http({
        url: '/rest/department',
        params: {
          subCompanyId: this.subCompanyList[arr[0]].id
        }
      })
      if (data.code == 200) {
        this.subCompanyList[arr[0]].children = data.data.map(item => {
          return {
            value: item.id,
            label: item.departmentmark
          }
        })
      }
    },
    async getSubCompanyList() {
      let {data} = await this.$http({
        url: '/rest/subCompany'
      })
      if (data.code == 200) {
        this.subCompanyList = data.data.map((item, i) => {
          return {
            value: i,
            label: item.subcompanyname,
            id: item.id,
            children: []
          }
        })
      }
    },
    async deleteClick(id) {
      let {data} = await this.$http({
        url: '/rest/hrmAttendance',
        method: 'put',
        data: {
          id: id
        }
      })
      if (data.code == 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      } else {
        this.$message(data.message)
      }
    },
    async getList() {
      const loading = this.$loading()
      let {data} = await this.$http({
        url: '/rest/hrmAttendance',
        params: {
          page: this.currentPage,
          size: this.pageSize,
          name: this.keyword,
          overtimeBeginDate: this.overtimeBeginDate && new Date(this.overtimeBeginDate).getTime(),
          departmentId: this.departmentArr && this.departmentArr[1]
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
<style scoped>
.ov{
  overflow: hidden;
}
.half{
  width: 50%;
  float: left;
}
</style>
