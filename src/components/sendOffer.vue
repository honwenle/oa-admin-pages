<template>
<div>
  <div class="send-row">
    <span class="send-label">常用抄送：</span>
    <el-checkbox-group 
      v-model="mailArr">
      <el-checkbox v-for="m in mailList" :label="m.mail" :key="m.mail">{{m.name}}</el-checkbox>
    </el-checkbox-group>
  </div>
  <div class="send-row">
    <span class="send-label">添加抄送：</span>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput" icon="el-icon-edit">添加</el-button>
  </div>
  <div class="send-bt">
    <el-button @click="$emit('send-ok')" size="small" type="primary" icon="el-icon-message">确认发送</el-button>
    <el-button @click="emptyAddressTag" size="small" icon="el-icon-delete">清空抄送</el-button>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      mailList: [
        {name: '飞姐', mail: '652408649@qq.com'},
        {name: '陈成', mail: '727586668@qq.com'},
        {name: '小敏', mail: '605102009@qq.com'},
        {name: '茜茜', mail: '407027614@qq.com'},
        {name: '苗苗', mail: '2352833076@qq.com'},
        {name: '吟吟', mail: '290788019@qq.com'},
        {name: '琪琪', mail: '1063320755@qq.com'},
        {name: '蒙蒙', mail: '2390320940@qq.com'},
        {name: '小倩', mail: '547269239@qq.com'}
      ],
      mailArr: []
    };
  },
  methods: {
    emptyAddressTag() {
      this.mailArr = []
      this.dynamicTags = []
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (this.dynamicTags.indexOf(inputValue) > -1) {
        this.$message({
          message: '该邮箱已存在',
          type: 'warning'
        })
        return false
      }
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>
<style>
.send-bt{
  margin-top: 20px;
}
.send-label{
  height: 32px;
  line-height: 32px;
}
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 32px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-input.input-new-tag {
    width: 180px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
