<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="140px">
      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="formData.postName"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="cityId">
        <el-select v-model="formData.cityId" style="width: 100%;" placeholder="请选择">
          <el-option v-for="item in cityList" :key="item.cityId" :value="item.cityId" :label="item.cityName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="formData.companyName"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="workType">
        <el-radio-group v-model="formData.workType">
          <el-radio :label="0">全职</el-radio>
          <el-radio :label="1">兼职</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-select v-model="formData.education" style="width: 100%;" placeholder="请选择">
          <el-option v-for="(item, i) in ['小学', '初中', '高中', '大专', '本科', '博士', '硕士', '教授']" :key="i" :value="i" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="薪资" prop="wage">
        <el-input v-model="formData.wage"></el-input>
      </el-form-item>
      <el-form-item label="福利" prop="benefit">
        <el-input v-model="formData.benefit"></el-input>
      </el-form-item>
      <el-form-item label="招聘人数" prop="advertiseNumber">
        <el-input-number v-model="formData.advertiseNumber"></el-input-number>
      </el-form-item>
      <el-form-item label="生效时间" prop="effectiveDate">
        <el-date-picker v-model="formData.effectiveDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="岗位描述" prop="postDesc" style="width: 100%;">
        <el-input type="textarea" v-model="formData.postDesc"></el-input>
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
      apiAdd: '/rest/post',
      apiUpdata: '/rest/post',
      apiDetail: '/rest/post/',
      cityList: []
    }
  },
  mounted() {
    this.getCityList()
  },
  methods: {
    async getCityList() {
      let {data} = await this.$http({
        url: '/rest/city/list'
      })
      if (data.code == 200) {
        this.cityList = data.data
      }
    }
  }
}
</script>
