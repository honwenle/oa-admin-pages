<template>
  <div class="wrap flex">
    <div class="f1">
      <table>
        <thead>
          <tr>
            <th colspan="2">特征分类</th>
            <th colspan="2">指标</th>
            <th class="flex"><span class="f1" v-for="i in 10" :key="i">{{i-1}}</span></th>
          </tr>
        </thead>
        <tbody v-if="infoData && infoData.scoreJson">
          <tr v-for="(item, i) in infoData.scoreJson.list" :key="i" :class="'color' + i">
            <td align="center">{{item.name}}</td>
            <td align="center">{{item.value}}</td>
            <td>
              <div class="target" v-for="tar in item.list" :key="tar.label">{{tar.label}}</div>
            </td>
            <td>
              <div class="target" style="width:20px" v-for="tar in item.list" :key="tar.label">{{tar.value}}</div>
            </td>
            <td>
              <div class="target" v-for="tar in item.list" :key="tar.label">
                <div class="tar-bar" :style="'width: ' + tar.value*100/9 + '%'"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="f1 ml30">
      <chart :infoData="infoData.scoreJson"></chart>
    </div>
  </div>
</template>
<script>
import Chart from '@/components/persona-chart-score'
export default {
  components: {
    Chart
  },
  data() {
    return {}
  },
  props: {
    infoData: {
      type: Object
    }
  }
}
</script>
<style scoped lang="scss">
.flex{
  display: flex;
}
.f1{
  flex: 1;
}
.f1.ml30{
  margin-left: 30px;
}
.wrap{
  min-width: 400px;
  padding: 20px;
}
table{
  background: #000;
  border-spacing: 1px;
  width: 100%;
}
td,th{
  height: 40px;
  line-height: 40px;
  background: #fff;
  padding: 5px;
}
.target{
  height: 40px;
}
.tar-bar {
  background: #59CFFF;
  height: 20px;
  transform: translateY(50%);
}
.color0 {
  td:first-child{
    background: #ACE7FF;
  }
  td:nth-child(2){
    background: #DCF3FB;
  }
  .tar-bar{
    background: #59CFFF;
  }
}
.color1 {
  td:first-child{
    background: #D4ECB0;
  }
  td:nth-child(2){
    background: #ECF6E1;
  }
  .tar-bar{
    background: #A9D961;
  }
}
.color2 {
  td:first-child{
    background: #FFE6A9;
  }
  td:nth-child(2){
    background: #FFF5DD;
  }
  .tar-bar{
    background: #FFCE54;
  }
}
.color3 {
  td:first-child{
    background: #ffb9b9;
  }
  td:nth-child(2){
    background: #ffdada;
  }
  .tar-bar{
    background: #ff8e8e;
  }
}
</style>
