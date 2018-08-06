<template lang="html">
  <div>
    <div class="buttons">
      <el-input v-model="params.name" clearable placeholder="输入名字" size="mini" style="width: 150px"></el-input>
      <el-input v-model="params.phone" clearable placeholder="输入电话" size="mini" style="width: 150px"></el-input>
      <el-date-picker type="date" clearable v-model="params.interviewDate" placeholder="选择面试日期" size="mini" style="width: 150px"></el-date-picker>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="getList">查询</el-button>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus-outline"
        @click="showAddForm">添加入职信息</el-button>
    </div>
    <el-row>
      <el-col>
        <el-table
          :data="tableData.data"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名"/>
          <el-table-column
            prop="phone"
            label="电话"/>
          <el-table-column
            prop="jobTitleName"
            label="求职岗位"/>
          <el-table-column
            prop="source"
            label="信息来源"/>
          <el-table-column
            prop="invitationName"
            label="邀约者"/>
          <el-table-column
            prop="interviewDate"
            label="邀约日期"/>
          <el-table-column
            prop="createDate"
            label="登记日期"/>
          <el-table-column
            prop="status"
            label="状态"/>
          <el-table-column
            prop="invitationRemark"
            label="邀约情况"/>
          <el-table-column
            width="200px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="showForm(scope.row.id)" type="primary" size="small">完善信息</el-button>
              <el-button type="primary" size="small" @click="sendInterview(scope.row.id)">发起面试</el-button>
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
    <el-dialog title="新增邀约" :visible.sync="isShowAddForm">
      <interview-form @save-ok="renewDate"></interview-form>
    </el-dialog>
    <el-dialog title="入职人员信息" :visible.sync="isShowForm" width="70%">
      <entry-form :id="editId" :key="editId" @close-from-child="renewDate"></entry-form>
    </el-dialog>
  </div>
</template>
<script>
import EntryForm from './entry-form'
import InterviewForm from './interview-form'
import listMixin from './mixins/list'
export default {
  mixins: [listMixin],
  components: {
    EntryForm,
    InterviewForm
  },
  data() {
    return {
      isShowForm: false,
      isShowAddForm: false,
      editId: 0,
      apiUrl: '/rest/resource/interview',
      params: {
        name: '',
        phone: '',
        interviewDate: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    renewDate() {
      this.isShowAddForm = false
      this.isShowForm = false
      this.getList()
    },
    showForm(id) {
      this.editId = id
      this.isShowForm = true
    },
    showAddForm() {
      this.isShowAddForm = true
    },
    async sendInterview(id) {
      let {data} = await this.$http({
        method: 'post',
        url: '/rest/workflow/interview',
        data: {
          id: id
        }
      })
      if (data.code == 200) {
        this.$message({
          message: '成功！',
          type: 'success'
        })
      } else {
        this.$message.error(data.message)
      }
    }
  }
}
</script>
