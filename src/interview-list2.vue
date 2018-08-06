<template lang="html">
  <div>
    <div class="buttons">
      <el-input v-model="params.name" clearable placeholder="输入名字" size="mini" style="width: 150px"></el-input>
      <el-input v-model="params.phone" clearable placeholder="输入电话" size="mini" style="width: 150px"></el-input>
      <el-date-picker type="date" clearable v-model="params.interviewDate" placeholder="选择面试日期" size="mini" style="width: 150px"></el-date-picker>
      <el-select v-model="status" placeholder="选择状态" size="mini" multiple style="width: 400px">
        <el-option label="待面试" value="no_interview"></el-option>
        <el-option label="面试中" value="in_interview"></el-option>
        <el-option label="面试失败" value="interview_fail"></el-option>
        <el-option label="信息待审核" value="no_audit"></el-option>
      </el-select>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="getList">查询</el-button>
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
            label="面试日期"/>
          <el-table-column
            prop="status"
            label="状态"/>
          <el-table-column
            prop="invitationRemark"
            label="原因"/>
          <el-table-column
            width="220px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="showForm(scope.row.id)" type="primary" size="small">查看简历</el-button>
              <el-button type="primary" size="small" @click="openSendTag(scope.row.id)">发送Offer</el-button>
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
    <el-dialog title="发送邮件" :visible.sync="isShowSend">
      <address-tag ref="addressTag" @send-ok="sendOffer"></address-tag>
    </el-dialog>
    <el-dialog title="入职人员信息" :visible.sync="isShowForm" width="70%">
      <entry-form :id="editId" :key="editId" @close-from-child="renewDate"></entry-form>
    </el-dialog>
  </div>
</template>
<script>
import EntryForm from './entry-form'
import addressTag from '@/components/sendOffer'
import listMixin from './mixins/list'
export default {
  mixins: [listMixin],
  components: {
    EntryForm,
    addressTag
  },
  data() {
    return {
      isShowForm: false,
      isShowSend: false,
      offerId: '',
      editId: 0,
      apiUrl: '/rest/resource/list',
      params: {
        name: '',
        phone: '',
        interviewDate: '',
        status: ''
      },
      status: this.$route.query.in == 1 ? ['in_interview'] : ['no_interview','in_interview','interview_fail','no_audit']
    }
  },
  methods: {
    beforeGetList() {
      this.params.status = this.status.join(',')
    },
    openSendTag(id) {
      this.offerId = id
      this.isShowSend = true
    },
    renewDate() {
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
    async sendOffer(id) {
      this.isShowSend = false
      let ccAddress = this.$refs.addressTag.dynamicTags.concat(this.$refs.addressTag.mailArr)
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
    }
  }
}
</script>
