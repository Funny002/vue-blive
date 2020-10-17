<template>
  <div id="RulerLine">
    <template v-for="(item,key) in RulerLine">
      <span :key="key" :class="`RulerLine-${item['isLevel'] ? 'top' : 'left'}`" :style="cssStyle(item)" @mouseup="lineMouseup" @mousedown="lineMousedown(key)"/>
    </template>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class RulerLine extends Vue {
  @Prop({type: [Array, Object]}) RulerLine?: { isLevel: boolean; distance: number }[]

  cssStyle({isLevel, distance}: { isLevel: boolean; distance: number }) {
    return {[isLevel ? 'top' : 'left']: distance + 'px'}
  }

  lineMouseup(): void {
    console.log('lineMouseup')
    this.$emit('mouseup')
  }

  lineMousedown(key: number): void {
    if (this.RulerLine) {
      this.$emit('mousedown', key, this.RulerLine[key])
    }
  }
}
</script>

<style lang="scss">
#RulerLine {
  width: 0 !important;
  height: 0 !important;

  > span {
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    z-index: 30;
    display: block;
    position: absolute;
    background-color: #fff;

    &:hover {
      z-index: 100;
      background-color: #FF86B2;
    }

    &.RulerLine {
      &-top {
        cursor: row-resize;
        width: calc(100vw - 18px);
      }

      &-left {
        height: 100vh;
        cursor: col-resize;
      }
    }
  }
}
</style>
