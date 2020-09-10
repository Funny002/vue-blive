<template>
  <span :class="classes" :style="cssStyle" @mousedown="domMousedown" @mouseup="domMouseup"/>
</template>

<script>
const classes = 'RulerLineList';
export default {
  name: "ruler-line-list",
  props: {
    // 是否水平线
    isLevel: Boolean,
    // 移动距离
    distance: {
      type: Number,
      default: 0,
      validator(value) {
        return !isNaN(value)
      }
    }
  },
  computed: {
    classes() {
      return [classes, `${classes}-${this.isLevel ? 'top' : 'left'}`]
    },
    cssStyle() {
      return {[this.isLevel ? 'top' : 'left']: this.distance + 'px'}
    }
  },
  methods: {
    domMouseup(event) {
      this.$emit('mouseup', event)
    },
    domMousedown(event) {
      this.$emit('mousedown', event)
    }
  }
}
</script>
<style lang="less">
@import "./RulerLineList.less";
</style>
