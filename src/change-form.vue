<template>
  <div>
    <el-form :model="userData" ref="userForm" label-width="150px" class="userForm">
      <el-form-item label="姓名" prop="lastname">
        <el-input v-model="userData.lastname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="员工号" prop="workcode">
        <el-input v-model="userData.workcode" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="原公司" prop="subcompanyname">
        <el-input v-model="userData.subcompanyname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="原部门" prop="departmentmark">
        <el-input v-model="userData.departmentmark" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="原职位" prop="jobtitlemark">
        <el-input v-model="userData.jobtitlemark" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formData" ref="changeForm" :rules="rules" label-width="150px" class="userForm">
      <el-form-item label="原工资" prop="originalWage">
        <el-input v-model="formData.originalWage"></el-input>
      </el-form-item>
      <el-form-item label="原社保福利及补贴" prop="originalWelfare">
        <el-input v-model="formData.originalWelfare"></el-input>
      </el-form-item>
      <el-form-item label="原合同起止日期" prop="originalContract">
        <el-date-picker
          style="width: 100%;"
          v-model="formData.originalContract"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="人事流程" prop="type">
        <el-select v-model="formData.type" style="width: 100%;">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="异动类型" prop="variantType">
        <el-select v-model="formData.variantType" style="width: 100%;">
          <el-option v-for="(item, i) in ['岗位调离', '岗位增加', '现职位空缺', '岗位不变']" :key="i" :label="item" :value="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位情况" prop="postSituation">
        <el-select v-model="formData.postSituation" style="width: 100%;">
          <el-option v-for="(item, i) in ['调动', '晋升', '降职', '调薪']" :key="i" :label="item" :value="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="现公司" prop="subCompanyId">
        <el-select v-model="formData.subCompanyId" placeholder="请选择分部" style="width: 100%;" @change="getDepartmentList">
          <el-option v-for="(item, i) in subCompanyList" :key="i" :label="item.subcompanyname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="现部门" prop="departmentId">
        <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%;">
          <el-option v-for="(item, i) in departmentList" :key="i" :label="item.departmentmark" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="现职位" prop="jobtitleId">
        <el-cascader
          style="width:100%"
          :options="jobGroupList"
          :show-all-levels="false"
          :props="jobGroupProps"
          @active-item-change="handleJobSelect"
          @change="handleJobChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="现工资" prop="presentWage">
        <el-input v-model="formData.presentWage"></el-input>
      </el-form-item>
      <el-form-item label="现合同起止日期" prop="presentContract">
        <el-date-picker
          style="width: 100%;"
          v-model="formData.presentContract"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="现社保福利及补贴" prop="presentWelfare">
        <el-input v-model="formData.presentWelfare"></el-input>
      </el-form-item>
      <el-form-item label="异动情况说明" prop="remark">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item label="异动生效时间" prop="effectiveDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="formData.effectiveDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-row>
        <el-button type="primary" @click="submitForm('changeForm')" :loading="posting">提交</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subCompanyList: [],
      departmentList: [],
      typeList: [{
        label: '调薪',
        value: 'wage'
      }, {
        label: '跨部门调岗',
        value: 'department_post'
      }, {
        label: '跨公司调岗',
        value: 'company_post'
      }, {
        label: '内部调岗',
        value: 'inside_post'
      }],
      jobGroupList: [],
      formData: {
        id: this.id,
        postSituation: '',
        entryDate: '',
        effectiveDate: null,
        subCompanyId: '',
        departmentId: '',
        jobtitleId: '',
        originalWage: '',
        presentWage: '',
        originalWelfare: '',
        presentWelfare: '',
        originalContract: [],
        presentContract: [],
        variantType: '',
        remark: '',
        type: ''
      },
      rules: {
        type: {required: true, message: '请选择人事流程'},
        variantType: {required: true, message: '请选择异动类型'},
        subCompanyId: {required: true, message: '请选择现公司'},
        departmentId: {required: true, message: '请选择现部门'},
        jobtitleId: {required: true, message: '请选择现职位'}
      },
      posting: false,
      jobGroupProps: {
        value: 'index'
      }
    }
  },
  props: {
    id: {
      type: Number
    },
    userData: {
      type: Object
    }
  },
  mounted() {
    this.getSubCompanyList()
    this.getJobGroupList()
  },
  methods: {
    async getSubCompanyList() {
      let {data} = await this.$http({
        url: '/rest/subCompany'
      })
      if (data.code == 200) {
        this.subCompanyList = data.data
      }
    },
    async getDepartmentList(id) {
      let {data} = await this.$http({
        url: '/rest/department',
        params: {
          subCompanyId: id
        }
      })
      if (data.code == 200) {
        this.departmentList = data.data
      }
    },
    handleJobChange(val) {
      this.formData.jobtitleId = this.jobGroupList[val[0]].children[val[1]].children[val[2]].id
    },
    async handleJobSelect(val) {
      if (val.length == 1) {
        this.jobGroupList[val[0]].children = await this.getJobActivityList(this.jobGroupList[val[0]].id)
      } else if (val.length == 2) {
        this.jobGroupList[val[0]].children[val[1]].children = await this.getJobTitleList(this.jobGroupList[val[0]].children[val[1]].id)
      }
    },
    async getJobGroupList() {
      let {data} = await this.$http({
        url: '/rest/jobGroups'
      })
      if (data.code == 200) {
        data.data.forEach((item, i) => {
          item.children = []
          item.index = i
        })
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
        data.data.forEach((item, i) => {
          item.children = []
          item.index = i
        })
        return data.data
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
        data.data.forEach((item, i) => {
          item.index = i
        })
        return data.data
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postForm()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async postForm() {
      this.posting = true
      let {data} = await this.$http({
        method: 'post',
        url: '/rest/workflow/variant',
        data: this.formData
      })
      if (data.code == 200) {
        this.$message({
          message: '执行成功！',
          type: 'success'
        })
        this.$emit('form-close')
      } else {
        this.$message.error(data.message);
      }
      this.posting = false
    }
  }
}
</script>
<style>
form.el-form.userForm {
  display: inline;
}
.el-form-item {
  display: inline-block;
  width: 45%;
}
</style>
