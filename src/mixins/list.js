export default {
  data() {
    return {
      posting: false,
      currentPage: 1,
      pageSize: 25,
      tableData: {},
      multipleSelection: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val.map(i => {
        return i.cityId
      })
    },
    async getList() {
      this.beforeGetList && this.beforeGetList()
      let params = {
        page: this.currentPage,
        size: this.pageSize
      }
      Object.assign(params, this.params)
      this.posting = true
      let {data} = await this.$http({
        url: this.apiUrl,
        params: params
      })
      if (data.code == 200) {
        this.tableData = data.data
      }
      this.posting = false
    },
    async delectClick(val) {
      if (val.length < 1) {
        this.$message.error('请选择要删除的记录')
        return false
      }
      let {data} = await this.$http({
        method: 'put',
        url: this.apiDelete,
        data: {
          id: val
        }
      })
      if (data.code == 200) {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        this.getList()
      } else {
        this.$message.error(data.message)
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}