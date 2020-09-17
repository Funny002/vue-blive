<template>
  <span v-if="true" ref="boxSpan" @blur="spanBlur" @click="spanCLick" :contenteditable="editor" v-text="value"/>
</template>
<script>
export default {
  name: "box-span",
  props: {
    keys: String, // 关键字
    value: String, // 内容
    proof: RegExp, // 验证规则
    default: String, // 验证失败默认填值
  },
  data: () => ({
    editor: false
  }),
  methods: {
    // 失焦 -> 关闭编辑 -> 验证规则 -> 回调
    spanBlur(event) {
      this.editor = false;
      const {target: {innerText: val}} = event;
      if (!val.match(this.proof)) this.$refs.boxSpan.innerText = this.default;
      this.$emit('Callback', this.$refs.boxSpan.innerText, this.keys);
    },
    // 开启编辑
    spanCLick() {
      this.editor = true;
    }
  }
}
</script>

<style scoped lang="less">
span {
  height: 30px;
  padding: 0 5px;
  min-width: 20px;
  outline: #ff86b2;
  line-height: 30px;
  display: inline-block;

  //&::before {
  //  content: '';
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 100%;
  //  border-width: 30px;
  //  position: absolute;
  //  border-style: solid;
  //  box-sizing: border-box;
  //  border-color: rgba(255, 255, 255, .4) rgba(170, 170, 170, .5);
  //}

  &:focus {
    box-shadow: inset 0 0 3px #ff86b2;
  }
}
</style>
