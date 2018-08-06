<template>
  <div>
    <el-form :model="userData" ref="userForm" label-width="100px" class="userForm">
      <el-form-item label="姓名" prop="lastname">
        <el-input v-model="userData.lastname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="员工号" prop="workcode">
        <el-input v-model="userData.workcode" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所属公司" prop="subcompanyname">
        <el-input v-model="userData.subcompanyname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="departmentmark">
        <el-input v-model="userData.departmentmark" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="岗位" prop="jobtitlemark">
        <el-input v-model="userData.jobtitlemark" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="入职日期" prop="createdate">
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="userData.createdate" style="width: 100%;" :disabled="true" />
      </el-form-item>
    </el-form>
    <el-form :model="formData" ref="internForm" :rules="rules" label-width="100px" class="userForm">
      <el-form-item label="考核得分" prop="score">
        <el-input v-model="formData.score"></el-input>
      </el-form-item>
      <el-form-item label="转正日期" prop="regularDate">
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formData.regularDate" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="试用工资" prop="probationaryWages">
        <el-input v-model="formData.probationaryWages"></el-input>
      </el-form-item>
      <el-form-item label="转正工资" prop="regularWages">
        <el-input v-model="formData.regularWages"></el-input>
      </el-form-item>
      <el-form-item label="转正意见" prop="suggestion">
        <el-select v-model="formData.suggestion" style="width: 100%;">
          <el-option v-for="item in suggestionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他说明" prop="otherExplain">
        <el-input type="textarea" v-model="formData.otherExplain"></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="attachmentRequest">
        <el-upload
          :action = "$ApiUrl + '/rest/file/upload'"
          :on-success="handleUpload"
          multiple
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <div class="dynamic">
        <el-row>
          <div class="dynamic-title">
            培训说明
            <i class="el-icon-circle-plus-outline"
              style="color: #67C23A" 
              @click="addForm"/>
          </div>
        </el-row>
        <el-form-item
          v-for="(item, index) in formData.training"
          :key="index"
          :prop="'training.'+index">
          <div class="dynamic-label">参加时间</div>
          <el-date-picker type="date" v-model="item.attendDate" />
          <div class="dynamic-label">课程名称</div>
          <el-input v-model="item.courseName"></el-input>
          <div class="dynamic-label">成绩</div>
          <el-input v-model="item.score"></el-input>
          <i class="el-icon-remove-outline"
            @click.prevent="removeForm(item)"
            style="color: #F56C6C"></i>
        </el-form-item>
      </div>
      <el-row>
        <el-button type="primary" @click="submitForm('internForm')" :loading="posting">提交</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      suggestionList: [{
        label: '同意转正',
        value: 0
      }, {
        label: '延长试用期',
        value: 1
      }, {
        label: '解除',
        value: 2
      }],
      formData: {
        id: this.id,
        score: '',
        entryDate: '',
        regularDate: '',
        probationaryWages: 0,
        regularWages: 0,
        suggestion: 0,
        otherExplain: '',
        attachmentRequest: [],
        training: []
      },
      rules: {
        score: { required: true, message: '请输入分数'},
        suggestion: { required: true, message: '请选择转正意见'},
        regularDate: { required: true, message: '请选择日期'},
        probationaryWages: { required: true, message: '请输入工资'},
        regularWages: { required: true, message: '请输入工资'},
      },
      posting: false,
      fileList: []
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
    this.addForm()
  },
  methods: {
    handleUpload(res) {
      if (res.code == 200 && res.data.length > 0) {
        this.formData.attachmentRequest.push(res.data[0].requestId)
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
        url: '/rest/workflow/regular',
        data: this.formData
      })
      if (data.code == 200) {
        this.$message({
          message: '执行成功！',
          type: 'success'
        })
        this.$emit('intern-form-close')
      } else {
        this.$message.error(data.message);
      }
      this.posting = false
    },
    addForm() {
      this.formData.training.push({
        attendDate: '',
        courseName: '',
        score: ''
      });
    },
    removeForm(item) {
      var index = this.formData.training.indexOf(item)
      if (index !== -1) {
        this.formData.training.splice(index, 1)
      }
    }
  }
}
</script>
<style>
form.el-form.userForm {
  display: inline;
}
</style>
