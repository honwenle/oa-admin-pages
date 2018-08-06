<template>
  <div>
    <div class="buttons">
      <name-search v-model="params.id" isFilterButton></name-search>
      <el-date-picker
        size="small"
        v-model="params.birthday"
        value-format="yyyy-MM-dd"></el-date-picker>
      <el-select v-model="params.companyId" size="small" placeholder="请选择分部" style="width: 200px;" @change="getDepartmentList">
        <el-option v-for="(item, i) in subCompanyList" :key="i" :label="item.subcompanyname" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="params.departmentId" size="small" placeholder="请选择部门" style="width: 200px;">
        <el-option v-for="(item, i) in departmentList" :key="i" :label="item.departmentmark" :value="item.id"></el-option>
      </el-select>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="getList">查询</el-button>
    </div>
    <el-table
      :data="tableData.data"
      border
      style="width: 100%">
      <el-table-column
        prop="loginid"
        label="员工编号"/>
      <el-table-column
        prop="subcompany"
        label="所属公司"/>
      <el-table-column
        prop="jobtitle"
        label="职务"/>
      <el-table-column
        prop="sex"
        label="性别"/>
      <el-table-column
        prop="department"
        label="所属部门"/>
      <el-table-column
        prop="lastname"
        label="姓名"/>
      <el-table-column
        width="100px"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="goPersona(scope.row.id)" size="small" type="primary">查看</el-button>
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
  </div>
</template>
<script>
import departMixin from '@/mixins/depart'
import listMixin from './mixins/list'
import NameSearch from '@/components/name-search'
export default {
  mixins: [listMixin, departMixin],
  components: {
    NameSearch
  },
  data() {
    return {
      tableData: {},
      currentPage: 1,
      pageSize: 25,
      id: 0,
      params: {
        id: '',
        birthday: '',
        companyId: '',
        departmentId: ''
      },
      apiUrl: '/rest/hrmResource/employeeList'
    }
  },
  mounted() {
    this.getSubCompanyList()
  },
  methods: {
    goPersona(id) {
      this.$router.push({
        name: 'PersonaOA',
        params: {
          id: id
        }
      })
    }
  }
}
</script>
