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
            prop="cityName"
            label="名称"/>
          <el-table-column
            width="200px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="showForm(scope.row.cityId)" type="primary" size="small">编辑</el-button>
              <el-button @click="delectClick([scope.row.cityId])" type="danger" size="small">删除</el-button>
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
      <city-form :id="editId" :key="editId" @save-ok="renewDate"></city-form>
    </el-dialog>
  </div>
</template>
<script>
import CityForm from './city-edit'
import listMixin from './mixins/list'
export default {
  mixins: [listMixin],
  components: {
    CityForm
  },
  data() {
    return {
      isShowForm: false,
      editId: 0,
      apiUrl: '/rest/city',
      apiDelete: '/rest/city/delete'
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
