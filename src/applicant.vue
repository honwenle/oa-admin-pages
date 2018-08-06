<template lang="html">
  <div>
    <div class="buttons">
      <el-input v-model="params.name" placeholder="输入姓名" style="width: 200px" size="small"></el-input>
      <el-input v-model="params.phone" placeholder="输入号码" style="width: 200px" size="small"></el-input>
      <el-select v-model="params.postId" style="width: 200px;" size="small" placeholder="选择岗位">
        <el-option v-for="item in positionList" :key="item.postId" :value="item.postId" :label="item.postName"></el-option>
      </el-select>
      <el-select v-model="params.cityId" style="width: 200px;" size="small" placeholder="选择城市">
        <el-option v-for="item in cityList" :key="item.cityId" :value="item.cityId" :label="item.cityName"></el-option>
      </el-select>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="getList">查询</el-button>
    </div>
    <el-row>
      <el-col>
        <el-table
          v-loading="posting"
          border
          :data="tableData.data"
          style="width: 100%">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"/>
          <el-table-column
            prop="phone"
            label="联系电话"/>
          <el-table-column
            prop="cityName"
            label="地区"/>
          <el-table-column
            prop="postName"
            label="应聘岗位"/>
          <el-table-column
            prop="applicantStatusCn"
            label="状态"/>
          <el-table-column
            width="200px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="showAddForm(scope.row)" :disabled="scope.row.applicantStatus == 1" type="primary" size="small">同步信息</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="height: 20px" />
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[25, 50, 75, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.count" />
      </el-col>
    </el-row>
    <el-dialog title="同步信息" :visible.sync="isShowAddForm" :key="editRow.applicantId">
      <interview-form :rowData="editRow" @save-ok="renewDate"></interview-form>
    </el-dialog>
  </div>
</template>
<script>
import listMixin from './mixins/list'
import InterviewForm from './interview-form'
export default {
  mixins: [listMixin],
  components: {
    InterviewForm
  },
  data() {
    return {
      apiUrl: '/rest/applicant',
      params: {
        name: '',
        phone: '',
        postId: '',
        cityId: ''
      },
      cityList: [],
      positionList: [],
      isShowAddForm: false,
      editRow: {}
    }
  },
  mounted() {
    this.getCityList()
    this.getPositionList()
  },
  methods: {
    renewDate() {
      this.isShowAddForm = false
      this.getList()
    },
    showAddForm(row) {
      this.editRow = row
      this.isShowAddForm = true
    },
    async getCityList() {
      let {data} = await this.$http({
        url: '/rest/city/list'
      })
      if (data.code == 200) {
        this.cityList = data.data
      }
    },
    async getPositionList() {
      let {data} = await this.$http({
        url: '/rest/post/list'
      })
      if (data.code == 200) {
        this.positionList = data.data
      }
    }
  }
}
</script>
