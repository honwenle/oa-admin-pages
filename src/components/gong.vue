<template>
  <div>
    <div class="g-row" v-for="(row, i) in gongData" :key="i">
      <div class="g label">
        {{row.label}}
      </div>
      <div class="g" v-for="(gong, j) in row.gong" :key="j" :class="{'on': gong.lv == lv}">
        <div class="t1">{{gong.lv + gong.t1}}</div>
        <div class="t2">{{gong.t2}}</div>
        <div class="t3" v-for="(t, k) in gong.t3" :key="k">· {{t}}</div>
        <div class="t4">{{gong.t4}}</div>
      </div>
    </div>
    <div class="g-row">
      <div class="g null"></div>
      <div class="g bottom" v-for="(item, i) in gongBottom" :key="i">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gongBottom: ['需改进', '可以完成目标', '优秀'],
      gongData: [{
        label: '巨大潜力',
        gong: [{
          lv: 6,
          t1: '非常有潜力的人才',
          t2: '（多是新提升人员）',
          t3: ['有成长的巨大潜力', '绩效低于预期', '给予一定训练后机会产生收益'],
          t4: '不移动，通过辅导提升绩效'
        },{
          lv: 3,
          t1: '能够达成目标，同时拥有巨大潜力',
          t2: '　',
          t3: ['有潜力担任更高职位/责任', '绩效知识达成可完成目标的水平'],
          t4: '水平移动，不同职能角色'
        },{
          lv: 1,
          t1: '明星员工',
          t2: '（需要提升到较高等级，否则容易被挖走）',
          t3: ['极具潜能', '绩效方面超出预期', '有潜力在职责范围上有巨大提升'],
          t4: '垂直晋升，不同职能角色，尽快提拔'
        }]
      }, {
        label: '有潜力',
        gong: [{
          lv: 8,
          t1: '潜在的达成目标者',
          t2: '　',
          t3: ['有望达成目标', '目前表现有差距'],
          t4: '不移动，在原有岗位上通过自身努力发挥优势'
        },{
          lv: 5,
          t1: '能够达成目标，拥有一定潜力',
          t2: '　',
          t3: ['有潜力在目前岗位上绩效更好', '绩效知识达到可以完成目标的水平'],
          t4: '水平移动，相似职能角色'
        },{
          lv: 2,
          t1: '有一定潜力的优秀员工',
          t2: '　',
          t3: ['有提高职责范围的潜力', '职责范围上有一定的灵活性', '绩效方面超出预期'],
          t4: '垂直晋升，相似职能角色'
        }]
      }, {
        label: '潜力用尽',
        gong: [{
          lv: 9,
          t1: '差绩效者',
          t2: '（进行调岗或淘汰）',
          t3: ['只有少许潜力', '绩效与要求由明显的差距', '须有管理方面的动作'],
          t4: '降级使用或本岗位继续发挥'
        },{
          lv: 7,
          t1: '达成目标者',
          t2: '　',
          t3: ['只有少许潜力', '绩效知识达到可以完成目标的水平'],
          t4: '不移动，在原有岗位上通过自身努力发挥优势'
        },{
          lv: 4,
          t1: '优秀员工',
          t2: '　',
          t3: ['潜力已发挥至尽', '绩效方面超出预期'],
          t4: '水平移动，极为相似职能角色'
        }]
      }]
    }
  },
  props: {
    lv: {
      type: Number
    }
  }
}
</script>
<style scoped>
.g-row{
  overflow: hidden;
}
.g{
  font-size: 12px;
  float: left;
  padding: 16px;
  width: 31%;
  height: 150px;
  box-sizing: border-box;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.g.label{
  width: 33px;
  padding: 3em 11px;
}
.t1{
  font-size: 14px;
}
.t2{
  color: #aaa;
}
.g.null{
  width: 2em;
  height: 45px;
}
.g.bottom{
  height: 45px;
  text-align: center;
}
.label,.bottom{
  font-weight: 600;
}
.g.on{
  background: #57BEF1;
  color: #fff;
}
</style>
