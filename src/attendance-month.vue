<template>
  <div class="monthtable">
    <div class="buttons">
      <el-input v-model="name" placeholder="输入搜索姓名" style="width: 200px" size="small" clearable></el-input>
      <el-input v-model="depart" placeholder="输入搜索部门" style="width: 200px" size="small" clearable></el-input>
      <el-date-picker
        size="small"
        v-model="month"
        value-format="yyyy-MM"
        type="month"
        placeholder="选择月">
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
      :header-cell-style="{textAlign: 'center'}"
      :data="tableData.data"
      border
      height="800"
      style="width: 100%">
      <el-table-column
        width="150"
        fixed="left"
        prop="subcompanyname"
        label="公司"/>
      <el-table-column
        width="150"
        fixed="left"
        prop="departmentmark"
        label="部门"/>
      <el-table-column
        prop="lastname"
        fixed="left"
        label="姓名"/>
      <el-table-column
        prop="remianAnnual"
        label="年假剩余"/>
      <el-table-column
        label="上月加班剩余（用于调休）">
        <el-table-column
          prop="lastQuarterWorkday"
          label="工作日"/>
        <el-table-column
          prop="lastQuarterSunday"
          label="周日"/>
        <el-table-column
          prop="lastQuarterHoliday"
          label="节假日"/>
      </el-table-column>
      <el-table-column
        label="本月加班">
        <el-table-column
          prop="currentWorkday"
          label="工作日"/>
        <el-table-column
          prop="currentSunday"
          label="周日"/>
        <el-table-column
          prop="currentHoliday"
          label="节假日"/>
      </el-table-column>
      <el-table-column
        label="本月调休">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.rest"
            ref="popover0"
            placement="right"
            title="调休详情">
            <el-table :data="popData">
              <el-table-column width="150" prop="applyDate" label="申请日期"></el-table-column>
              <el-table-column width="150" prop="startDate" label="开始时间"></el-table-column>
              <el-table-column width="150" prop="endDate" label="结束时间"></el-table-column>
            </el-table>
          </el-popover>
          <el-button v-popover:popover0 @click="getPopData(scope.row.id, 0)" class="no-padding" type="text" v-if="scope.row.rest">{{scope.row.rest}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="本月加班剩余（结算加班费）">
        <el-table-column
          prop="currentWorkdayJs"
          label="工作日"/>
        <el-table-column
          prop="currentSundayJs"
          label="周日"/>
        <el-table-column
          prop="currentHolidayJs"
          label="节假日"/>
      </el-table-column>
      <el-table-column
        label="本月加班剩余（用于调休）">
        <el-table-column
          prop="currentWorkdayTx"
          label="工作日"/>
        <el-table-column
          prop="currentSundayTx"
          label="周日"/>
        <el-table-column
          prop="currentHolidayTx"
          label="节假日"/>
      </el-table-column>
      <el-table-column
        label="迟到">
        <el-table-column
          prop="amTenCount"
          label="10分钟以内"/>
        <el-table-column
          prop="amTenAndThirtyCount"
          label="10-30分钟"/>
      </el-table-column>
      <el-table-column
        label="早退">
        <el-table-column
          prop="pmTenCount"
          label="10分钟以内"/>
      </el-table-column>
      <el-table-column
        label="缺勤">
        <el-table-column
          prop="amThirtyCount"
          label="迟到30分钟以上"/>
        <el-table-column
          label="事假">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.casualLeave"
              ref="popover1"
              placement="right"
              title="事假详情">
              <el-table :data="popData">
                <el-table-column width="150" prop="applyDate" label="申请日期"></el-table-column>
                <el-table-column width="150" prop="startDate" label="开始时间"></el-table-column>
                <el-table-column width="150" prop="endDate" label="结束时间"></el-table-column>
              </el-table>
            </el-popover>
            <el-button v-popover:popover1 @click="getPopData(scope.row.id, 1)" class="no-padding" type="text" v-if="scope.row.casualLeave">{{scope.row.casualLeave}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="病假">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.sickLeave"
              ref="popover2"
              placement="right"
              title="病假详情">
              <el-table :data="popData">
                <el-table-column width="150" prop="applyDate" label="申请日期"></el-table-column>
                <el-table-column width="150" prop="startDate" label="开始时间"></el-table-column>
                <el-table-column width="150" prop="endDate" label="结束时间"></el-table-column>
              </el-table>
            </el-popover>
            <el-button v-popover:popover2 @click="getPopData(scope.row.id, 2)" class="no-padding" type="text" v-if="scope.row.sickLeave">{{scope.row.sickLeave}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="annualLeave"
          label="年假"/>
        <el-table-column
          label="其他假">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.otherLeave"
              ref="popover3"
              placement="right"
              title="请假详情">
              <el-table :data="popData">
                <el-table-column width="150" prop="applyDate" label="申请日期"></el-table-column>
                <el-table-column width="150" prop="startDate" label="开始时间"></el-table-column>
                <el-table-column width="150" prop="endDate" label="结束时间"></el-table-column>
              </el-table>
            </el-popover>
            <el-button v-popover:popover3 @click="getPopData(scope.row.id, 3)" class="no-padding" type="text" v-if="scope.row.otherLeave">{{scope.row.otherLeave}}</el-button>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="出差天数">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.businessTrip"
            ref="popover4"
            placement="right"
            title="出差详情">
            <el-table :data="popData">
              <el-table-column width="150" prop="applyDate" label="申请日期"></el-table-column>
              <el-table-column width="150" prop="startDate" label="开始时间"></el-table-column>
              <el-table-column width="150" prop="endDate" label="结束时间"></el-table-column>
            </el-table>
          </el-popover>
          <el-button v-popover:popover4 @click="getPopData(scope.row.id, 4)" class="no-padding" type="text" v-if="scope.row.businessTrip">{{scope.row.businessTrip}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="attendanceAbnormal"
        label="考勤异常"/>
      <el-table-column
        prop="mealAllowance"
        label="加班餐补"/>
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
import json2csv from '@/json2csv.js'
export default {
  data() {
    return {
      tableData: {},
      currentPage: 1,
      pageSize: 25,
      name: '',
      depart: '',
      month: '',
      isExport: false,
      popData: [],
      popType: ['lieu', 'casual', 'sick', 'other', 'business']
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getPopData(id, type) {
      let {data} = await this.$http({
        url: '/rest/hrmAttendance/dateList/' + this.popType[type],
        params: {
          id: id,
          month: this.month
        }
      })
      if (data.code == 200) {
        this.popData = data.data
      }
    },
    async getAll() {
      if (this.month == '') {
        this.$message({
          showClose: true,
          message: '请选择导出月份',
          type: 'warning'
        })
        return false
      }
      this.isExport = true
      let {data} = await this.$http({
        url: '/rest/hrmAttendance/month/export',
        params: {
          name: this.name,
          deptName: this.depart,
          month: this.month
        }
      })
      if (data.code == 200) {
        this.isExport = false
        this.exportCsv(data.data)
      } else {
        this.$message(data.message)
      }
    },
    exportCsv(data) {
      json2csv.setDataConver({
        data: data,
        fileName: '月考勤导出表',
        columns: {
          title: ['姓名','公司','部门','上个月剩余工作日加班','上个月剩余周日日加班','上个月剩余节假日加班','本月工作日加班','本月周日加班','本月节假日加班','本月节假日加班（用于调休）','本月周日加班（用于调休）','本月节假日加班（用于调休）','本月节假日加班（用于结算工资）','本月周日加班（用于结算工资）','本月节假日加班（用于结算工资）','调休','事假','病假','年假剩余','其他假','出差','迟到10分钟','30分钟','迟到30分钟','早退10分钟','20分钟','早退30分钟','餐补','考勤异常','本月年假'],
          key: ['lastname','subcompanyname','departmentmark','lastQuarterWorkday','lastQuarterSunday','lastQuarterHoliday','currentWorkday','currentSunday','currentHoliday','currentWorkdayTx','currentSundayTx','currentHolidayTx','currentWorkdayJs','currentSundayJs','currentHolidayJs','rest','casualLeave','sickLeave','annualLeave','otherLeave','businessTrip','amTenCount','amTenAndThirtyCount','amThirtyCount','pmTenCount','pmTenAndThirtyCount','pmThirty','mealAllowance','attendanceAbnormal','annualLeave']
        }
      })
    },
    async getList() {
      const loading = this.$loading()
      let {data} = await this.$http({
        url: '/rest/hrmAttendance/month',
        params: {
          page: this.currentPage,
          size: this.pageSize,
          name: this.name,
          deptName: this.depart,
          month: this.month
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
.el-button.no-padding{
  padding: 0;
}
</style>
