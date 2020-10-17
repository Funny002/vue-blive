<template>
  <div id="RulerBody" :style="{'z-index':zIndex}" @mousedown.stop="mousedown" @mouseup.stop="mouseup">
    <slot/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

interface Mark {
  x: number;
  y: number;
}

@Component
export default class RulerBody extends Vue {
  zIndex = 10;
  onMousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null = null;

  mouseMobile({x, y}: Mark) {
    const start: Mark = {x, y}
    const {left, top}: { left: number; top: number } = this.$store.getters['Expand/getRulerMobile']
    // 定义
    document.onmousemove = ({x, y}: Mark) => this.$store.commit('Expand/setRulerMobile', {left: left + (x - start.x), top: top + (y - start.y)})
  }

  mousedown(event: MouseEvent) {
    if (!this.onMousemove) {
      // 防止重复拷贝
      this.onMousemove = document.onmousemove
    }
    // 拷贝
    this.zIndex = 1000
    // 更改层级
    this.mouseMobile(event)
  }

  mouseup() {
    document.onmousemove = this.onMousemove
    // 还原
    this.onMousemove = null
    // 清空
    this.zIndex = 10
    // 还原层级
  }
}
</script>
<style scoped lang="scss">
#RulerBody {
  top: 16px;
  left: 16px;
  //overflow: hidden;
  position: relative;
  width: calc(100vw - 34px);
  height: calc(100vh - 16px);
  padding-top: calc(150px - 16px);
  padding-left: calc(150px - 16px);
}
</style>
