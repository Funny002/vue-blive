<template>
  <div ref="rulerItem" :class="[classes, `${classes}-${this.size}`, `${classes}-${this.type}`]" @click="rulerItemClick">
    <canvas
        :height="rulerItem.height * rulerItem.ratio"
        :width="rulerItem.width * rulerItem.ratio"
        class="RulerItem-canvas"
        ref="rulerItemCanvas"
        :style="canvasStyle"
    />
  </div>
</template>
<script>
export default {
  name: "ruler-item",
  data: function () {
    return {
      classes: 'RulerItem',
      canvasDom: null,
      canvas: {
        distance: 5, // 距离
        lineWidth: 1, // 线条大小
        lineColor: "", // 线条颜色
        isTop: this.type === 'top', // 上 or 下
        isLeft: this.type === 'left', // 左 or 右
        isNormal: this.size === 'normal', // 线长
        isLevel: ['top', 'bottom'].includes(this.type)
      },
      // 初始化数据
      rulerItem: {top: 0, left: 0, ratio: 0, width: 0, height: 0}
    }
  },
  props: {
    size: {
      type: String,
      default: "normal",
      validator(value) {
        return ['normal', 'small'].includes(value)
      }
    },
    type: {
      type: String,
      default: 'left',
      validator(value) {
        return ['top', 'left', 'right', 'bottom'].includes(value);
      }
    }
  },
  computed: {
    canvasStyle() {
      let {top, left, width, height} = this.rulerItem
      return {top: `${top}px`, left: `${left}px`, width: width + 'px', height: height + 'px'}
    }
  },
  methods: {
    rulerItemClick(event) {
      const {rulerItem, canvasDom} = this
      this.$emit('click', event, {rulerItem, canvasDom})
    },
    getRatio(canvasDom) {
      this.rulerItem.ratio = ((context) => {
        const backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
      })(canvasDom)
    },
    // 写字
    drawWord(i, {y, x}) {
      const {width, height} = this.rulerItem
      const {isLevel, isLeft, isTop} = this.canvas
      // -------
      if (isLevel) {
        y = isTop ? height : 0
      } else {
        x = isLeft ? width : 0
      }
      if (!isLevel) {
        this.canvasDom.save()
        if (isLeft) {
          this.canvasDom.translate(x, y);
          this.canvasDom.rotate(-90 * Math.PI / 180);
        } else {
          this.canvasDom.translate(0, y);
          this.canvasDom.rotate(90 * Math.PI / 180);
        }
        this.canvasDom.fillText(`${i - (height / 3)}`, 4, -2);
        this.canvasDom.restore()
      } else {
        this.canvasDom.fillText(`${i - (width / 3)}`, x + 4, y - 2);
      }
    },
    // 画线
    drawLine(start, end, is) {
      // context.translate(x + .5 * width, y + .5 * height);
      // context.rotate(angleInRadians);
      this.canvasDom.beginPath();
      this.canvasDom.lineWidth = this.canvas.lineWidth / (is ? 1 : 2);
      this.canvasDom.moveTo(start.x, start.y);
      this.canvasDom.lineTo(end.x, end.y);
      this.canvasDom.strokeStyle = "#111";
      this.canvasDom.stroke();
    },
    // 循环
    startDrawLine() {
      const {width, height} = this.rulerItem
      const {isLevel, isTop, isLeft, distance} = this.canvas
      const start = isLevel ? width : height
      const w_ = (!isLevel ? width : height) / 4
      for (let i = distance; i < start; i += distance) {
        let w = w_
        if (i % (distance * 10) === 0) {
          w *= 2
        }
        let [start, end] = [{x: 0, y: 0}, {x: 0, y: 0}]
        if (isLevel) {
          start = {x: i, y: isTop ? 0 : height - w}
          end = {x: i, y: isTop ? w : height}
        } else {
          start = {x: isLeft ? 0 : width - w, y: i}
          end = {x: isLeft ? w : width, y: i}
        }
        setTimeout(() => {
          if (i % (distance * 10) === 0) this.drawWord(i, end)
          this.drawLine(start, end, i % (distance * 5) === 0)
        })
      }
    },
    init() {
      // 如不等待会有 bug
      setTimeout(() => {
        // 获取画布
        this.canvasDom = this.$refs.rulerItemCanvas.getContext('2d')
        // 模糊画布
        this.getRatio(this.canvasDom)
        // 获取容器大小
        const {scrollWidth: width, scrollHeight: height} = this.$refs.rulerItem
        console.log(width, height)
        // 修改画布大小
        Object.assign(this.rulerItem, this.canvas.isLevel ? {width: width * 3, height} : {width, height: height * 3})
        Object.assign(this.rulerItem, this.canvas.isLevel ? {left: `-${width - 150}` - 0} : {top: `-${height - 150}` - 0})
        // 修改画布分辨率
        this.canvasDom.scale(this.rulerItem.ratio, this.rulerItem.ratio);
        // 开始
        this.startDrawLine()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
      window.onresize = () => {
        this.init()
      }
    })
  },
}
</script>
<style lang="less">
@import "./RulerItem.less";
</style>
