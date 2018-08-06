<template lang="html">
  <div>
    <div class="buttons">
      <el-input v-model="keyword" placeholder="输入搜索关键字" style="width: 200px" size="small"></el-input>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="getList">查询</el-button>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus-outline"
        @click="showForm(0)">添加入职信息</el-button>
    </div>
    <el-row>
      <el-col>
        <el-table
          :data="tableData.data"
          border
          style="width: 100%">
          <el-table-column
            prop="resourceId"
            label="员工ID">
          </el-table-column>
          <el-table-column
            prop="lastName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="workCode"
            label="员工号">
          </el-table-column>
          <el-table-column
            prop="subCompany"
            label="分部">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="jobTitle"
            label="岗位">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="employmentDate"
            label="入职日期">
          </el-table-column>
          <el-table-column
            prop="auditStatus"
            label="状态">
          </el-table-column>
          <el-table-column
            width="200px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="showForm(scope.row.resourceId)" type="primary" size="small">查看</el-button>
              <el-button type="primary" size="small" @click="openSendTag(scope.row.resourceId)">发送offer</el-button>
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
      </el-col>
    </el-row>
    <el-dialog title="入职人员信息" :visible.sync="isShowForm" width="70%">
      <entry-form :id="currentId" :key="key" @close-from-child="renewDate"></entry-form>
    </el-dialog>
    <el-dialog title="发送邮件" :visible.sync="isShowSend">
      <address-tag ref="addressTag" @send-ok="sendOffer"></address-tag>
    </el-dialog>
  </div>
</template>
<script>
import addressTag from '@/components/sendOffer'
import EntryForm from './entry-form'
import moment from 'moment'
export default {
  components: {
    EntryForm,
    addressTag
  },
  data() {
    return {
      isShowForm: false,
      currentId: 0,
      currentPage: 1,
      pageSize: 25,
      filter: {
        name: '',
        stat: null
      },
      tableData: {},
      key: 0,
      keyword: '',
      isShowSend: false,
      offerId: ''
    }
  },
  watch: {
    isShowForm (val) {
      val && (this.key = Math.random())
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    openSendTag(id) {
      this.offerId = id
      this.isShowSend = true
    },
    renewDate() {
      this.isShowForm = false
      this.getList()
    },
    dateFormat(row, col) {
      return moment(row[col.property]).format("YYYY-MM-DD")
    },
    async getList() {
      const loading = this.$loading()
      let {data} = await this.$http({
        url: '/rest/resource',
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
    async sendOffer(id) {
      this.isShowSend = false
      let ccAddress = this.$refs.addressTag.dynamicTags
      let {data} = await this.$http({
        method: 'post',
        url: '/rest/resource/email',
        data: {
          resourceId: this.offerId,
          ccAddress: ccAddress
        }
      })
      if (data.code == 200) {
        this.$message('成功');
      } else {
        this.$message.error(data.message);
      }
    },
    showForm(id) {
      this.currentId = id
      this.isShowForm = true
    },
    handleClick(row) {
      console.log(row);
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
