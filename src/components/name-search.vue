<template>
  <el-select
    :style="isFilterButton ? 'width: 200px;' : 'width: 100%;'"
    :size="isFilterButton ? 'small' : ''"
    :value="xxx"
    filterable
    clearable
    remote
    :placeholder="namecn || '请输入关键词'"
    @input="upup"
    :remote-method="getManagerList"
    :loading="loadingManagerId" :disabled="isComplete">
    <el-option
      v-for="(item, i) in managerList"
      :key="i"
      :label="item.lastname"
      :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      xxx: '',
      loadingManagerId: false,
      managerList: []
    }
  },
  props: {
    value: [String, Number],
    isComplete: Boolean,
    isFilterButton: {
      type: Boolean,
      default: false
    },
    namecn: String
  },
  methods: {
    async getManagerList(query) {
      if (query !== '') {
        this.loadingManagerId = true;
        let {data} = await this.$http({
          url: '/rest/hrmResource/managers',
          params: {
            manager: query
          }
        })
        if (data.code == 200) {
          this.managerList = data.data
        }
        this.loadingManagerId = false
      } else {
        this.managerList = [];
      }
    },
    upup(val) {
      const person = this.managerList.find(({id}) => id === val)
      this.xxx = person ? person.lastname : ''
      this.$emit('input', val)
    }
  }
}
</script>
