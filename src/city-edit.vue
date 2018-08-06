<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="城市名称" prop="cityName">
        <el-input v-model="formData.cityName"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/save'
export default {
  mixins: [saveMixin],
  data() {
    return {
      formData: {},
      rules: {},
      apiDetail: '',
      apiAdd: '/rest/city',
      apiUpdata: '/rest/city',
      apiDetail: '/rest/city/'
    }
  }
}
</script>
