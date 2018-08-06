export default {
  data() {
    return {
      initDepart: true,
      subCompanyList: [],
      departmentList: []
    }
  },
  methods: {
    async getSubCompanyList() {
      let {data} = await this.$http({
        url: '/rest/subCompany'
      })
      if (data.code == 200) {
        this.subCompanyList = data.data
      }
      this.id && this.getDepartmentList(this.formData.subCompany || this.params.companyId)
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
        if (this.initDepart) {
          this.initDepart = false
        } else {
          this.formData ? (this.formData.department = null) : (this.params.departmentId = null)
        }
      }
    }
  }
}