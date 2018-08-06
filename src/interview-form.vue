<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="姓名" prop="lastName">
        <el-input v-model="formData.lastName"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="分公司" prop="subCompany">
        <el-select v-model="formData.subCompany" placeholder="请选择" style="width: 100%;" @change="getDepartmentList">
          <el-option v-for="(item, i) in subCompanyList" :key="i" :label="item.subcompanyname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="formData.department" placeholder="请选择" style="width: 100%;">
          <el-option v-for="(item, i) in departmentList" :key="i" :label="item.departmentmark" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务类型" prop="jobGroup">
        <el-select v-model="formData.jobGroup" placeholder="请选择" style="width: 100%;" @change="getJobActivityList">
          <el-option v-for="(item, i) in jobGroupList" :key="i" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务" prop="jobActivity">
        <el-select v-model="formData.jobActivity" placeholder="请选择" style="width: 100%;" @change="getJobTitleList">
          <el-option v-for="(item, i) in jobActivityList" :key="i" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位" prop="jobTitle">
        <el-select v-model="formData.jobTitle" placeholder="请选择" style="width: 100%;">
          <el-option v-for="(item, i) in jobTitleList" :key="i" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="面试日期" prop="interviewDate">
        <el-date-picker style="width: 100%" value-format="yyyy-MM-dd" v-model="formData.interviewDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="信息来源" prop="source">
      <el-select v-model="formData.source" placeholder="请选择">
        <el-option v-for="(item, i) in ['报纸', '网络', '经人介绍', '现场招聘']" :key="i" :value="i" :label="item"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="邀约者" prop="invitationId">
        <name-search v-model="formData.invitationId"></name-search>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import departMixin from '@/mixins/depart'
import saveMixin from '@/mixins/save'
import NameSearch from '@/components/name-search'
export default {
  mixins: [saveMixin, departMixin],
  components: {
    NameSearch
  },
  data() {
    return {
      isUpdate: this.rowData.applicantId,
      formData: {
        lastName: this.rowData.name,
        mobile: this.rowData.phone
      },
      rules: {
        lastName: {required: true, message: '此项必填'},
        mobile: [{
          required: true, message: '此项必填'
        }, {
          pattern: /^1[34578]\d{9}$/, message: '请填写正确手机号'
        }],
        jobGroup: {required: true, message: '此项必填'},
        jobActivity: {required: true, message: '此项必填'},
        jobTitle: {required: true, message: '此项必填'},
        interviewDate: {required: true, message: '此项必填'},
        source: {required: true, message: '此项必填'},
        invitationId: {required: true, message: '此项必填'}
      },
      apiAdd: '/rest/resource/interview',
      apiUpdata: '/rest/resource/applicant/' + this.rowData.applicantId,
      jobGroupList: [],
      jobActivityList: [],
      jobTitleList: []
    }
  },
  props: {
    rowData: Object
  },
  mounted() {
    this.getSubCompanyList()
    this.getJobGroupList()
  },
  methods: {
    async getJobGroupList() {
      let {data} = await this.$http({
        url: '/rest/jobGroups'
      })
      if (data.code == 200) {
        this.jobGroupList = data.data
      }
    },
    async getJobActivityList(id) {
      let {data} = await this.$http({
        url: '/rest/jobActivities',
        params: {
          groupId: id
        }
      })
      if (data.code == 200) {
        this.jobActivityList = data.data
      }
    },
    async getJobTitleList(id) {
      let {data} = await this.$http({
        url: '/rest/jobTitles',
        params: {
          activityId: id
        }
      })
      if (data.code == 200) {
        this.jobTitleList = data.data
      }
    }
  }
}
</script>
