import Vue from 'vue'
import Router from 'vue-router'
import EntryList from '@/entry-list'
import EntryComplete from '@/entry-complete'
import ChangeList from '@/change-list'
import AllList from '@/all-list'
import EmployeeList from '@/employee-list'
import InternList from '@/intern-list'
import Home from '@/home'
import Chart from '@/chart'
import Persona from '@/persona'
import PersonaOA from '@/persona-oa'
import OvertimeList from '@/overtime-list'
import AttendanceWeek from '@/attendance-week'
import AttendanceMonth from '@/attendance-month'
import Recruit from '@/recruit'
import InterviewList0 from '@/interview-list0'
import InterviewList2 from '@/interview-list2'
import InterviewList3 from '@/interview-list3'
import City from '@/city'
import Position from '@/position'
import Applicant from '@/applicant'
import Test from '@/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/entrylist',
      name: 'EntryList',
      component: EntryList
    }, {
      path: '/entrycomplete/:id',
      name: 'EntryComplete',
      component: EntryComplete
    }, {
      path: '/test',
      name: 'test',
      component: Test
    }, {
      path: '/changelist',
      name: 'ChangeList',
      component: ChangeList
    }, {
      path: '/alllist',
      name: 'AllList',
      component: AllList
    }, {
      path: '/employeelist',
      name: 'EmployeeList',
      component: EmployeeList
    }, {
      path: '/internlist',
      name: 'InternList',
      component: InternList
    }, {
      path: '/chart',
      name: 'Chart',
      component: Chart
    }, {
      path: '/persona/:id',
      name: 'Persona',
      component: Persona
    }, {
      path: '/persona-oa/:id',
      name: 'PersonaOA',
      component: PersonaOA
    }, {
      path: '/overtimelist',
      name: 'OvertimeList',
      component: OvertimeList
    }, {
      path: '/attendance-week',
      name: 'AttendanceWeek',
      component: AttendanceWeek
    }, {
      path: '/attendance-month',
      name: 'AttendanceMonth',
      component: AttendanceMonth
    }, {
      path: '/recruit',
      name: 'Recruit',
      component: Recruit
    }, {
      path: '/interview-list0',
      name: 'InterviewList0',
      component: InterviewList0
    }, {
      path: '/interview-list2',
      name: 'InterviewList2',
      component: InterviewList2
    }, {
      path: '/interview-list3',
      name: 'InterviewList3',
      component: InterviewList3
    }, {
      path: '/city',
      name: 'City',
      component: City
    }, {
      path: '/position',
      name: 'Position',
      component: Position
    }, {
      path: '/applicant',
      name: 'Applicant',
      component: Applicant
    }
  ]
})
