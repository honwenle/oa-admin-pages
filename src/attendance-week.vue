<template>
  <div>
    <div class="buttons">
      <el-input v-model="name" placeholder="输入搜索姓名" style="width: 200px" size="small" clearable></el-input>
      <el-input v-model="depart" placeholder="输入搜索部门" style="width: 200px" size="small" clearable></el-input>
      <el-date-picker
        v-model="week"
        value-format="yyyy-MM-dd"
        size="small"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="getList">查询</el-button>
      <el-button
        :loading="isExport"
        type="primary"
        size="mini"
        icon="el-icon-download"
        @click="getAll">导出</el-button>
    </div>
    <el-table
      :data="tableData.data"
      border
      height="800"
      style="width: 100%">
      <el-table-column
        width="120"
        fixed="left"
        prop="date"
        label="日期"/>
      <el-table-column
        fixed="left"
        prop="personName"
        label="姓名"/>
      <el-table-column
        width="120"
        fixed="left"
        prop="deptName"
        label="部门"/>
      <el-table-column
        width="120"
        prop="amNoRecord"
        label="上班未打卡"/>
      <el-table-column
        width="120"
        prop="pmNoRecord"
        label="下班未打卡"/>
      <el-table-column
        width="120"
        prop="dayNoRecord"
        label="全天未打卡"/>
      <el-table-column
        width="120"
        prop="amTen"
        label="迟到10分钟"/>
      <el-table-column
        width="130"
        prop="amTenAndThirty"
        label="迟到10到30分钟"/>
      <el-table-column
        width="130"
        prop="amThirty"
        label="迟到30分钟以上"/>
      <el-table-column
        width="120"
        prop="amClockStatusCn"
        label="上午打卡状态"/>
      <el-table-column
        width="120"
        prop="pmTen"
        label="早退10分钟"/>
      <el-table-column
        width="130"
        prop="pmTenAndThirty"
        label="早退10到30分钟"/>
      <el-table-column
        width="130"
        prop="pmThirty"
        label="早退30分钟以上"/>
      <el-table-column
        width="120"
        prop="pmClockStatusCn"
        label="下午打卡状态"/>
      <el-table-column
        width="180"
        prop="minEventTime"
        label="上班打卡时间"/>
      <el-table-column
        width="180"
        prop="maxEventTime"
        label="下班打卡时间"/>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openEdit(scope.row)">修改</el-button>
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
    <el-dialog title="编辑状态" :visible.sync="isShowEdit">
      <el-form :model="editData" :key="editData.id">
        <el-form-item label="上午状态">
          <el-select v-model="editData.amClockStatus" placeholder="请选择状态">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下午状态">
          <el-select v-model="editData.pmClockStatus" placeholder="请选择状态">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import json2csv from '@/json2csv.js'
export default {
  data() {
    return {
      tableData: {},
      currentPage: 1,
      pageSize: 25,
      name: '',
      depart: '',
      week: '',
      isExport: false,
      isShowEdit: false,
      editData: {},
      statusList: [
        {label: '正常', value: 'normal'},
        {label: '事假', value: 'casual'},
        {label: '调休', value: 'leave_in_lieu'},
        {label: '病假', value: 'sick'},
        {label: '年假', value: 'annual'},
        {label: '其他假', value: 'other_leave'},
        {label: '出差', value: 'business'},
        {label: '其他', value: 'other'}
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async submitEdit() {
      let {data} = await this.$http({
        method: 'put',
        url: '/rest/clockAbnormality',
        data: this.editData
      })
      if (data.code == 200) {
        this.$message({
          message: '执行成功！',
          type: 'success'
        })
        this.isShowEdit = false
        this.getList()
      } else {
        this.$message.error(data.message);
      }
    },
    openEdit({id, amClockStatus, pmClockStatus}) {
      this.editData = {id, amClockStatus, pmClockStatus}
      this.isShowEdit = true
    },
    async getAll() {
      this.isExport = true
      let {data} = await this.$http({
        url: '/rest/hrmAttendance/week/export',
        params: {
          name: this.name,
          deptName: this.depart,
          beginDate: this.week[0] || '',
          endDate: this.week[1] || ''
        }
      })
      if (data.code == 200) {
        this.isExport = false
        this.exportCsv(data.data)
      }
    },
    exportCsv(data) {
      json2csv.setDataConver({
        data: data,
        fileName: '周考勤导出表',
        columns: {
          title: ['日期', '姓名', '部门', '上班未打卡', '下班未打卡', '全天未打卡', '迟到10分钟', '30分钟', '迟到30分钟以上', '早退10分钟', '早退10到30分钟', '早退30分钟以上'],
          key: ['date', 'personName', 'deptName', 'amNoRecord', 'pmNoRecord', 'dayNoRecord', 'amTen', 'amTenAndThirty', 'amThirty', 'pmTen', 'pmTenAndThirty', 'pmThirty']
        }
      })
    },
    async getList() {
      const loading = this.$loading()
      let {data} = await this.$http({
        url: '/rest/hrmAttendance/week',
        params: {
          page: this.currentPage,
          size: this.pageSize,
          name: this.name,
          deptName: this.depart,
          beginDate: this.week[0] || '',
          endDate: this.week[1] || ''
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
