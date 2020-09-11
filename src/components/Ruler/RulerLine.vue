<template>
  <div class="RulerLine">
    <span :key="key" :class="classes(item)" :style="cssStyle(item)" @mouseup="lineMouseup(key)" @mousedown="lineMousedown(key)" v-for="(item,key) in RulerLine"/>
  </div>
</template>
<script>
const classes = 'RulerLineList';
export default {
  name: "ruler-line",
  props: ['RulerLine'],
  methods: {
    cssStyle({isLevel, distance}) {
      return {[isLevel ? 'top' : 'left']: distance + 'px'}
    },
    classes({isLevel}) {
      return [classes, `${classes}-${isLevel ? 'top' : 'left'}`]
    },
    lineMouseup(key) {
      this.$emit('mouseup', key, this.RulerLine[key])
    },
    lineMousedown(key) {
      this.$emit('mousedown', key, this.RulerLine[key])
    }
  }
}
</script>

<style lang="less">
.RulerLineList {
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-width: 0;
  position: absolute;
  border-color: #fff;
  border-style: solid;

  &-top {
    height: 0;
    cursor: row-resize;
    border-top-width: 1px;
  }

  &-left {
    width: 0;
    cursor: col-resize;
    border-left-width: 1px;
  }

  &:hover {
    z-index: 100;
    border-color: #FF86B2;
  }
}
</style>
