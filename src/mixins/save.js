export default {
  data() {
    return {
      posting: false,
      Id: this.id || this.$route.query.id
    }
  },
  props: {
    id: {
      type: Number
    }
  },
  mounted() {
    this.Id && this.getDetail()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async postForm() {
      this.posting = true
      let {data} = await this.$http({
        method: this.Id ? 'put' : 'post',
        url: (this.Id || this.isUpdate) ? this.apiUpdata : this.apiAdd,
        data: this.formData
      })
      if (data.code == 200) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.$emit('save-ok')
      } else {
        this.$message.error(data.message)
      }
      this.posting = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.beforePost && this.beforePost()
          this.postForm()
        } else {
          this.$message.error('错了哦，这是一条错误消息')
          return false
        }
      })
    },
    async getDetail() {
      let {data} = await this.$http({
        url: this.apiDetail + this.Id
      })
      if (data.code == 200) {
        this.formData = data.data
      }
      this.afterGetDetail && this.afterGetDetail()
    }
  }
}