<template>
  <div :id="`RulerItem-${this.type}`" ref="RulerItem" @mousedown="rulerItemClick">
    <canvas ref="RulerItemCanvas" :width="(canvas.width * canvas.PixelRatio)+'px'" :height="(canvas.height * canvas.PixelRatio)+'px'" :style="canvasStyle"/>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

interface Mark {
  x: number;
  y: number;
}

@Component
export default class RulerItem extends Vue {
  @Prop({default: 0, validator: value => !isNaN(value)}) mobile?: number;
  @Prop({default: 'top', validator: value => ['top', 'left'].includes(value)}) type?: 'top' | 'left';
  //
  CanvasElementDom: any = null
  canvas = {
    margin: 0,
    width: 16,
    height: 16,
    isLevel: true,
    PixelRatio: 1,
  } as { width: number; height: number; PixelRatio: number; margin: number; isLevel: boolean }

  // 动态样式
  get canvasStyle(): { [ket: string]: string } {
    let {width, height} = this.canvas;
    const {canvas: {isLevel, margin}, mobile} = this;
    [width, height] = isLevel ? [width, 16] : [16, height];
    return {width: width + 'px', height: height + 'px', [`margin-${isLevel ? 'left' : 'top'}`]: (margin + (mobile || 0)) + 'px'}
  }

  rulerItemClick({clientX, clientY}: { clientX: number; clientY: number }) {
    const isLevel = this.type === 'top'
    const distance = !isLevel ? clientX - 18 : clientY
    this.$emit('ruler-item-click', {isLevel, distance})
  }

  // 写字
  drawWord(maxSize: number, isLevel: boolean, PixelRatio: number, i: number, end: Mark) {
    const text = String((i - (maxSize / 3)) / PixelRatio)
    this.CanvasElementDom.font = `${10 * PixelRatio}px Arial`
    if (isLevel) {
      this.CanvasElementDom.fillText(text, end.x + (4 * PixelRatio), 14 * PixelRatio);
    } else {
      this.CanvasElementDom.save()
      this.CanvasElementDom.translate(16 * PixelRatio, end.y);
      this.CanvasElementDom.rotate(-90 * Math.PI / 180);
      this.CanvasElementDom.fillText(text, 4 * PixelRatio, ~(2 * PixelRatio) + 2);
      this.CanvasElementDom.restore()
    }
  }

  // 画线
  drawLine(start: Mark, end: Mark, is: boolean) {
    this.CanvasElementDom.beginPath();
    this.CanvasElementDom.strokeStyle = "#000";
    this.CanvasElementDom.lineWidth = is ? 1 : 0.7
    this.CanvasElementDom.moveTo(start.x, start.y);
    this.CanvasElementDom.lineTo(end.x, end.y);
    this.CanvasElementDom.stroke();
  }

  // 开始循环 -> 无限制
  startDrawLine(maxSize: number) {
    const {PixelRatio, isLevel} = this.canvas
    const stop = (5 * PixelRatio)
    const iStop = stop * 10
    for (let i = stop; i < maxSize; i += stop) {
      const is = i % iStop === 0
      const w = (is ? 10 : 4) * PixelRatio
      const [start, end]: Mark[] = isLevel ? [{x: i, y: 0}, {x: i, y: w}] : [{x: 0, y: i}, {x: w, y: i}]
      //
      setTimeout(() => {
        is && this.drawWord(maxSize, isLevel, PixelRatio, i, end);
        this.drawLine(start, end, is)
      })
    }
  }

  // 初始化
  init(size: number) {
    size += 50 - size % 50
    const isLevel = this.canvas.isLevel
    this.canvas.PixelRatio = window.devicePixelRatio
    this.CanvasElementDom = this.$refs.RulerItemCanvas
    this.canvas[isLevel ? 'width' : 'height'] = size * 3
    this.CanvasElementDom = this.CanvasElementDom.getContext('2d')
    this.canvas = Object.assign({}, this.canvas, {margin: ~(size) + 151, PixelRatio: window.devicePixelRatio})
    // 初始化完毕 -> 开始绘画
    this.startDrawLine((size * 3) * this.canvas.PixelRatio)
  }

  mounted() {
    this.$nextTick(() => {
      this.canvas.isLevel = this.type === 'top'
      // 默认绘画全屏 width * height
      const {width, height}: { width: number; height: number } = window.screen
      // 初始化
      this.init(this.canvas.isLevel ? width : height)
    })
  }
}
</script>

<style scoped lang="scss">
div {
  &[id^="RulerItem-"] {
    width: 16px;
    z-index: 20;
    height: 16px;
    overflow: hidden;
    position: absolute;
    text-align: initial;
    background-color: rgba(255, 255, 255, .5);

    > canvas {
      z-index: 1;
    }
  }

  &#RulerItem {
    &-top {
      width: calc(100vw - 18px) !important;
    }

    &-left {
      height: 100vh !important;
    }
  }
}
</style>
