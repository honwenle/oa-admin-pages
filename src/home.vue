<template>
  <el-table
    :data="routeList">
    <el-table-column label="描述" prop="desc" />
    <el-table-column
      label="路由">
      <template slot-scope="scope">
        <router-link :to="scope.row.route">{{scope.row.route}}</router-link>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      routeList: [{
        route: '/',
        desc: '目录',
      }, {
        route: '/entrylist',
        desc: '新增入职员工列表',
      }, {
        route: '/entrycomplete/:id',
        desc: '入职信息完善页面',
      }, {
        route: '/changelist',
        desc: '异动员工列表',
      }, {
        route: '/alllist',
        desc: '全部员工列表',
      }, {
        route: '/internlist',
        desc: '试用员工列表',
      }, {
        route: '/chart',
        desc: '图表页面',
      }, {
        route: '/persona/:id',
        desc: '员工画像页面',
      }, {
        route: '/overtimelist',
        desc: '加班列表',
      }, {
        route: '/attendance-week',
        desc: '周考勤',
      }, {
        route: '/attendance-month',
        desc: '月考勤',
      }, {
        route: '/recruit',
        desc: '招聘',
      }, {
        route: '/employeelist',
        desc: '全部员工列表(OA)',
      }, {
        route: '/city',
        desc: '城市管理',
      }, {
        route: '/position',
        desc: '岗位管理',
      }, {
        route: '/applicant',
        desc: '应聘管理',
      }]
    }
  }
}
</script>
