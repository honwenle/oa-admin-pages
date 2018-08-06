<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{
  margin: 0;
}
.el-form-item {
  display: inline-block;
  width: 45%;
}
.dynamic .el-form-item{
  width: 100%;
}
.dynamic-title {
  width: 140px;
}
.dynamic .el-input{
  flex: 1;
}
.dynamic .el-form-item__content, .dynamic-flex{
  display: flex;
}
.dynamic-label{
  flex: 1;
}
.dynamic i{
  font-size: 1.5em;
}
.buttons{
  padding: 20px 0;
}
</style>
