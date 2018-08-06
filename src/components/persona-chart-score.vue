<template>
  <div class="margin-auto" v-if="infoData">
    <div class="table">
      <div class="tr" v-for="j in 9" :key="j" :class="{'b-blue': j == 3, 'b-red': j == 7}">
        <div class="td" v-for="i in infoData.list.length" :key="i"></div>
      </div>
      <div>
        <div
          class="bar"
          v-for="(bar, i) in infoData.list"
          :key="bar.name"
          :style="'height: ' + bar.value*100/9 + '%; left: ' + (100*i/infoData.list.length + 50/infoData.list.length) + '%;'">
        </div>
      </div>
    </div>
    <div class="tr">
      <div class="td fff" v-for="(bar, i) in infoData.list" :key="i" :class="'color'+i">{{bar.value}}</div>
    </div>
    <div class="tr">
      <div class="td" v-for="(bar, i) in infoData.list" :key="i">{{bar.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    infoData: {
      type: Object
    }
  }
}
</script>
<style scoped>
.margin-auto{
  margin: 0 auto;
}
.table{
  position: relative;
}
.tr{
  overflow: hidden;
  display: flex;
}
.tr.b-blue{
  border-top: 1px solid #3693ED;
}
.tr.b-red{
  border-top: 1px solid #FF4D0B;
}
.td{
  flex: 1;
  height: 45px;
  line-height: 45px;
  border-left: 1px #ddd solid;
  border-top: 1px dashed #ddd;
  text-align: center;
}
.color0{
  background: #59CFFF;
}
.color1{
  background: #A9D961;
}
.color2{
  background: #FFCE54;
}
.color3{
  background: #ff8e8e;
}
.bar {
  width: 10px;
  position: absolute;
  bottom: 0;
  transform: translateX(-50%);
}
.bar:nth-child(1) {
  background: #59CFFF;
}
.bar:nth-child(2) {
  background: #A9D961;
}
.bar:nth-child(3) {
  background: #FFCE54;
}
.bar:nth-child(4) {
  background: #ff8e8e;
}
.fff{
  color: #fff;
}
</style>
