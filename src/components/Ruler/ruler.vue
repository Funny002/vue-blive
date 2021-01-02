<template>
  <div :class="['ruler']" ref="Ruler" :style="getStyle" @mouseup="mouseup">
    <ruler-line :data="rulerLine" @mouseup="mouseup" @mousedown="onLineMousedown"/>
    <ruler-item type="top" :deviation="deviation?(deviation.top ||0):0" @mouseup="mouseup" @mousedown="onMousedown"/>
    <ruler-item type="left" :deviation="deviation?(deviation.left ||0):0" @mouseup="mouseup" @mousedown="onMousedown"/>
    <div class="ruler-body" @mouseup="onmouseup" @mousedown="onmousedown">
      <slot/>
    </div>
  </div>
</template>
<script lang="ts">
import {RulerItemType, RulerLineItem} from "./verifyRules";
import {Component, Vue, Prop} from "vue-property-decorator";
//
import RulerLine from "./ruler-line.vue";
import RulerItem from "./ruler-item.vue";

@Component({components: {RulerItem, RulerLine}})
export default class Ruler extends Vue {
  @Prop() deviation?: { top: number; left: number };
  rulerDom?: HTMLElement | HTMLElement[] | Element | Element[] | Vue | Vue[];
  rulerLine: RulerLineItem[] = [];
  rulerKeys?: number;
  onmousemove?: any;
  backgroundImage = require('@/assets/image/RulerBack.jpg')

  getDom(): HTMLElement {
    if (!this.rulerDom) this.rulerDom = this.$refs.Ruler
    return this.rulerDom as HTMLElement
  }

  getSize(type?: RulerItemType) {
    const {clientWidth, clientHeight} = this.getDom()
    if (type) {
      return ['top', 'bottom'].includes(type) ? clientHeight : clientWidth;
    } else {
      return {width: clientWidth, height: clientHeight};
    }
  }

  get getStyle() {
    const {backgroundImage} = this
    console.log(backgroundImage)
    return {
      backgroundImage: 'url("' + backgroundImage + '")'
    }
  }

  onmousedown(event: Event) {
    this.$emit('mousedown', event)
  }

  onmouseup(event: Event) {
    this.$emit('mouseup', event)
  }

  // 共用移动方法
  mousedown(): void {
    if (!this.rulerKeys && this.rulerKeys !== 0) return; // 隔离
    if (!this.onmousemove) this.onmousemove = this.getDom().onmousemove;
    //
    const {rulerLine, rulerKeys} = this
    const {level} = rulerLine[rulerKeys]
    this.getDom().onmousemove = (event: MouseEvent) => {
      this.rulerLine[rulerKeys].distance = (level ? event.y : event.x - 20)
    }
  }

  // 共用重置方法
  mouseup(): void {
    this.getDom().onmousemove = this.onmousemove
    this.onmousemove = null // 重置
    const key = this.rulerKeys
    if (key !== undefined) {
      const {distance} = this.rulerLine[key]
      if (distance <= 20) {
        this.rulerLine.splice(key, 1)
      }
      this.rulerKeys = undefined
    }
  }

  // 参考线进入方法
  onLineMousedown(key: number): void {
    this.rulerKeys = key
    this.mousedown()
  }

  // 标尺进入方法
  onMousedown(type: RulerItemType, event: MouseEvent): void {
    const level = type === 'top';
    this.rulerKeys = this.rulerLine.length; // 设置key
    this.rulerLine.push({level, distance: level ? event.y : event.x - 20}); // 设置初始值
    this.mousedown()
  }
}
</script>
<style scoped lang="scss">
.ruler {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background-size: 14px;

  &-body {
    top: 0;
    left: 0;
    width: 100%;
    z-index: 90;
    height: 100%;
    position: absolute;
    padding: 150px 0 0 150px;
    background-color: rgba(169, 169, 169, 0.75);
  }
}
</style>
