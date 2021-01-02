<template>
  <div :class="classes" ref="RulerItem" @mouseup="event=>onMouseup(type,event)" @mousedown="event=>onMousedown(type,event)">
    <!--    <div class="ruler-item-nav"/>-->
    <canvas class="ruler-item-body" :width="canvasWidth+'px'" :height="canvasHeight+'px'" :style="getStyle" ref="RulerItemBody"/>
  </div>
</template>

<script lang="ts">
import {RulerItemType} from "./verifyRules";
import {Component, Prop, Vue} from "vue-property-decorator";
import Thread from '@/utils/thread';

@Component
export default class RulerItem extends Vue {
  @Prop({default: 0}) deviation?: number; // 像素偏移
  @Prop({default: "top"}) type?: RulerItemType; // 方向
  //
  CanvasDom: CanvasRenderingContext2D | null = null;
  //
  ratio = window.devicePixelRatio
  canvasWidth = 0;
  canvasHeight = 0;

  // 设置样式
  get classes(): string[] {
    return ["ruler-item", "ruler-item-" + this.type];
  }

  get getStyle() {
    return {
      [`margin-${['top', 'bottom'].includes(this.type || 'top') ? 'left' : 'top'}`]: `-${((this.deviation || 0) % 5)}px`
    }
  }

  onMouseup(type: RulerItemType, event: MouseEvent): void {
    this.$emit("mouseup", type, event);
  }

  onMousedown(type: RulerItemType, event: MouseEvent): void {
    this.$emit("mousedown", type, event);
  }

  // 获取 dom
  getDom(): CanvasRenderingContext2D {
    if (!this.CanvasDom) this.CanvasDom = (this.$refs.RulerItemBody as HTMLCanvasElement).getContext('2d');
    return this.CanvasDom as CanvasRenderingContext2D
  }

  // 获取大小
  getSize(ratio = 1): { [key: string]: number } {
    const {clientHeight, clientWidth} = (this.$refs.RulerItem as Element);
    return {width: clientWidth * ratio, height: clientHeight * ratio};
  }

  // 设置大小
  setCanvasSize(): void {
    const {width, height} = this.getSize(this.ratio);
    [this.canvasWidth, this.canvasHeight] = [width, height]
  }

  // 画布重置
  canvasRect(): void {
    // 清空画布
    const {width, height} = this.getSize(this.ratio);
    this.getDom().fillRect(0, 0, width, height);
  }

  getTypeToMap(i: number, type: RulerItemType, ratio: number, mapMax: number): { [key: string]: { [key: string]: number } } {
    const mapMin = mapMax - Math.floor(mapMax / 6 * (i % (25 * ratio) === 0 ? 4 : 2));
    let [start, end] = [{x: 0, y: 0}, {x: 0, y: 0}];
    if (type === 'top') {
      [start, end] = [{x: i, y: mapMin}, {x: i, y: mapMax}];
    } else if (type === 'left') {
      [start, end] = [{x: mapMax, y: i}, {x: mapMin, y: i}];
    } else if (type === 'bottom') {
      [start, end] = [{x: i, y: 0}, {x: i, y: mapMax - mapMin}];
    } else if (type === 'right') {
      [start, end] = [{x: 0, y: i}, {x: mapMax - mapMin, y: i}];
    }
    return {start, end}
  }

  init(): void {
    if (this.type) {
      this.setCanvasSize(); // 设置画布
      const {deviation, type, canvasHeight, canvasWidth, ratio} = this;
      const maxInt = Math.max(canvasHeight, canvasWidth)
      const h = Math.min(canvasHeight, canvasWidth)
      console.time(`RulerItem :>> type: ${type}`)  //开始
      let mapSpot = 0
      Thread.start(() => {
        if (mapSpot > maxInt) {
          Thread.close();
        } else {
          this.onDrawLines(mapSpot, type, ratio, h, deviation || 0);
          mapSpot += 5 * ratio;
          // (mapSpot % 25 === 0) && this.onWrite(mapSpot, (deviation || 0));
        }
        return true;
      }, function () {
        console.timeEnd(`RulerItem :>> type: ${type}`); //结束
      });
      // 调整工厂方法
      // 获取较长的数值
    }
  }

  onDrawLines(i: number, type: RulerItemType, ratio: number, mapMax: number, deviation: number) {
    console.log(deviation)
    const {start, end} = this.getTypeToMap(i, type, ratio, mapMax)
    this.$nextTick(() => {
      this.getDom().beginPath();
      this.getDom().lineWidth = 1
      this.getDom().strokeStyle = "#000";
      this.getDom().moveTo(start.x, start.y);
      this.getDom().lineTo(end.x, end.y);
      this.getDom().stroke();
    })
  }

  onWrite(i: number, deviation: number) {
    const text = i + deviation + ''
    console.log(i, text)
  }

  // 初始化
  initialize() {
    this.init()
  }

  // 生命周期 - 页面加载完毕
  mounted(): void {
    // 生命周期 - 页面渲染完毕
    this.$nextTick(() => this.initialize())
  }
}
</script>
<style scoped lang="scss">
.ruler-item {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow: hidden;
  position: absolute;
  box-shadow: 0 0 3px #aaa;
  background-color: rgba(255, 255, 255, 0.6);

  &-body {
    width: 100%;
    height: 100%;
  }

  &-nav {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #000;
  }

  &-top,
  &-bottom {
    height: 20px !important;

    .ruler-item {
      &-nav {
        width: 1px !important;
      }

      &-body {
        margin-top: 0 !important;
      }
    }
  }

  &-left,
  &-right {
    width: 20px !important;

    .ruler-item {
      &-nav {
        height: 1px !important;
      }

      &-body {
        margin-left: 0 !important;
      }
    }
  }

  &-bottom {
    top: auto !important;
    bottom: 0 !important;
  }

  &-right {
    right: 0 !important;
    left: auto !important;
  }
}
</style>
