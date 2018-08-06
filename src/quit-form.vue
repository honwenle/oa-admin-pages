<template>
  <div>
    <el-form :model="userData" ref="userForm" label-width="120px" class="userForm">
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
    <el-form :model="formData" ref="quitForm" :rules="rules" label-width="120px" class="userForm">
      <el-form-item label="合同有效期至" prop="contractDate">
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formData.contractDate" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="预计离职日期" prop="leaveDate">
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formData.leaveDate" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="工装" prop="formData" style="width:100%">
        <el-checkbox border v-model="formData.autumn" true-label="1" false-label="0">秋装</el-checkbox>
        <el-checkbox border v-model="formData.summerWear" true-label="1" false-label="0">夏装</el-checkbox>
        <el-checkbox border v-model="formData.winterClothes" true-label="1" false-label="0">冬装</el-checkbox>
        <el-checkbox border v-model="formData.suit" true-label="1" false-label="0">套装</el-checkbox>
        <el-checkbox border v-model="formData.shoes" true-label="1" false-label="0">鞋子</el-checkbox>
        <el-checkbox border v-model="clothOther">其他</el-checkbox>
        <el-input v-show="clothOther" v-model="formData.clothOther" size="small" style="width: 120px"></el-input>
      </el-form-item>
      <el-form-item label="离职类型" prop="leaveType">
        <el-select v-model="formData.leaveType" style="width: 100%;">
          <el-option v-for="item in quitType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否住宿" prop="isStop">
        <el-switch v-model="formData.isStop" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-form-item label="是否体检" prop="examination">
        <el-switch v-model="formData.examination" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-form-item label="是否缴纳保险" prop="isSecurity">
        <el-switch v-model="formData.isSecurity" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-form-item label="离职原因" prop="reason" style="width:100%">
        <el-input v-model="formData.reason" style="width: 80%" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="上级情况说明" prop="explain" style="width:100%">
        <el-input v-model="formData.explain" style="width: 80%" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-row>
        <el-button type="primary" @click="submitForm('quitForm')" :loading="posting">提交</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quitType: [{
        label: '辞职',
        value: 0
      }, {
        label: '辞退',
        value: 1
      }, {
        label: '其他',
        value: 2
      }],
      clothOther: false,
      formData: {
        id: this.id,
        entryDate: '',
        contractDate: '',
        leaveDate: '',
        isStop: 0,
        leaveType: '',
        examination: 0,
        isSecurity: 0,
        autumn: 0,
        summerWear: 0,
        winterClothes: 0,
        suit: 0,
        shoes: 0,
        clothOther: '',
        reason: '',
        explain: ''
      },
      rules: {
        contractDate: {required: true, message: '日期必填'},
        leaveType: {required: true, message: '请选择离职类型'},
        isStop: {required: true},
        examination: {required: true},
        isSecurity: {required: true}
      },
      posting: false
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
  methods: {
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
        url: '/rest/workflow/dimission',
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
