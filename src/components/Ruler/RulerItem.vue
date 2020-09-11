<template>
  <div ref="RulerItem" :class="classes" @mousedown="rulerItemClick">
    <canvas
        :style="canvasStyle"
        ref="RulerItemCanvas"
        :width="canvas.width * canvas.ratio+'px'"
        :height="canvas.height * canvas.ratio+'px'"
    />
  </div>
</template>
<script>
const classes = 'RulerItem';
export default {
  name: "ruler-item",
  props: {
    // 移动距离 ± Number
    mobile: {type: Number, default: 0, validator: value => !isNaN(value)},
    // 标尺类型 top or left
    type: {type: String, default: "top", validator: value => ['top', 'left'].includes(value)},
  },
  computed: {
    classes() { // 设置样式
      return [classes, `${classes}-${this.type}`]
    },
    canvasStyle() {
      const {isLevel, width, height, mobile} = this.canvas;
      return {
        width: width + 'px',
        height: height + 'px',
        [`margin-${!isLevel ? 'top' : 'left'}`]: `${mobile + this.mobile}px`
      }
    },
  },
  data: function () {
    return {
      canvasDom: null,
      canvas: {
        mobile: 0,// 默认基点
        ratio: 1, // 画布分辨率
        width: 0, // 宽
        height: 0, // 高
        isLevel: true, // 是否水平线
      }
    }
  },
  methods: {
    init(size) {
      this.getRatio() // 画布
      size += 50 - size % 50
      const isLevel = this.type === 'top'
      Object.assign(this.canvas, {isLevel, mobile: ~(size) + 151})
      Object.assign(this.canvas, isLevel ? {width: size * 3, height: 16} : {width: 16, height: size * 3})
      this.startDrawLine()
    },
    // 循环
    startDrawLine() {
      const {width, height, isLevel} = this.canvas
      const max = isLevel ? width : height
      for (let i = 5; i < max; i += 5) {
        const w = i % 50 === 0 ? 10 : 4;
        const [start, end] = isLevel ? [{x: i, y: 0}, {x: i, y: w}] : [{x: 0, y: i}, {x: w, y: i}]
        setTimeout(() => {
          if (i % 50 === 0) this.drawWord(i, end)
          this.drawLine(start, end, i % 25 === 0)
        })
      }
    },
    // 写字
    drawWord(i, end) {
      const {isLevel, width, height} = this.canvas
      const text = i - ((isLevel ? width : height) / 3)
      if (isLevel) {
        this.canvasDom.fillText(text, end.x + 4, 14);
      } else {
        this.canvasDom.save()
        this.canvasDom.translate(16, end.y);
        this.canvasDom.rotate(-90 * Math.PI / 180);
        this.canvasDom.fillText(text, 4, -2);
        this.canvasDom.restore()
      }
    },
    // 画线
    drawLine(start, end, is) {
      this.canvasDom.beginPath();
      this.canvasDom.strokeStyle = "#000";
      this.canvasDom.lineWidth = is ? 1 : 0.5;
      this.canvasDom.moveTo(start.x, start.y);
      this.canvasDom.lineTo(end.x, end.y);
      this.canvasDom.stroke();
    },
    getRatio() {
      this.canvasDom = this.$refs.RulerItemCanvas.getContext('2d')
      this.canvas.ratio = ((context) => {
        const backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
      })(this.canvasDom)
      this.canvasDom.scale(this.canvas.ratio, this.canvas.ratio);
    },
    rulerItemClick() {
      this.$emit('mousedown', this.canvas)
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.init(1080)
      })
    })
  }
}
</script>

<style lang="less">
.RulerItem {
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background-color: rgba(255, 255, 255, .7);

  &-top {
    height: 16px;
  }

  &-left {
    width: 16px;
  }
}
</style>
