<template lang="html">
  <div>
    <div class="buttons">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="showForm(0)">添加</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" @click="delectClick(multipleSelection)">删除</el-button>
    </div>
    <el-row>
      <el-col>
        <el-table
          v-loading="posting"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :data="tableData.data"
          border
          style="width: 100%">
          <el-table-column
            fixed="left"
            type="selection">
          </el-table-column>
          <el-table-column
            prop="postName"
            label="岗位名称"/>
          <el-table-column
            prop="cityName"
            label="工作地点"/>
          <el-table-column
            prop="workTypeCn"
            label="工作类型"/>
          <el-table-column
            prop="education"
            label="学历要求"/>
          <el-table-column
            prop="wage"
            label="薪资"/>
          <el-table-column
            prop="benefit"
            label="福利"/>
          <el-table-column
            prop="advertiseNumber"
            label="招聘人数"/>
          <el-table-column
            prop="effectiveDate"
            label="生效时间"/>
          <el-table-column
            width="200px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="showForm(scope.row.postId)" type="primary" size="small">编辑</el-button>
              <el-button @click="delectClick([scope.row.postId])" type="danger" size="small">删除</el-button>
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
    <el-dialog title="编辑" :visible.sync="isShowForm" width="70%">
      <position-form :id="editId" :key="editId" @save-ok="renewDate"></position-form>
    </el-dialog>
  </div>
</template>
<script>
import PositionForm from './position-edit'
import listMixin from './mixins/list'
export default {
  mixins: [listMixin],
  components: {
    PositionForm
  },
  data() {
    return {
      isShowForm: false,
      editId: 0,
      apiUrl: '/rest/post',
      apiDelete: '/rest/post/delete'
    }
  },
  methods: {
    renewDate() {
      this.isShowForm = false
      this.getList()
    },
    showForm(id) {
      this.editId = id
      this.isShowForm = true
    }
  }
}
</script>
