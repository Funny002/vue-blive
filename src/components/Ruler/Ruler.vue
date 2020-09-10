<template>
  <div ref="Ruler" :class="classes" @mouseup="RulerMouseup" :style="{'background-image': `url('${RulerBack}')`}">
    <ruler-line @mouseup="RulerLineMouseup" :ruler-line="RulerLine.list" @mousedown="RulerLineMousedown"/>
    <ruler-item type="left" :size="isSmall?'small':'normal'" @mousedown="RulerItemMousedown"/>
    <ruler-item type="top" :size="isSmall?'small':'normal'" @mousedown="RulerItemMousedown"/>
    <div :class="classesBody">
      <slot/>
    </div>
  </div>
</template>

<script>
import RulerItem from './RulerItem.vue'
import RulerLine from './RulerLine.vue'

const classes = 'Ruler'
export default {
  name: "Ruler",
  components: {'ruler-item': RulerItem, 'ruler-line': RulerLine},
  data: function () {
    return {
      isSmall: true,
      ClientRects: null,
      onMousemove: null,
      RulerLine: {list: [], key: null},
      RulerBack: require('../../assets/image/RulerBack.jpg')
    }
  },
  computed: {
    classes() {
      return [classes]
    },
    classesBody() {
      const isSmall = this.isSmall ? 'small' : 'normal'
      return [`${classes}-body`, `${classes}-body-${isSmall}`]
    }
  },
  methods: {
    RulerMouseup() {
      const {key} = this.RulerLine;
      key && this.RulerLineMouseup(key);
      document.onmousemove = this.onMousemove;
    },
    RulerLineMouseup(index) {
      this.RulerLine.key = index
      // 手动触发
      const {isSmall, RulerLine: {key, list}} = this
      const minDistance = isSmall ? 16 : 25
      if (list[key].distance <= minDistance) {
        this.RulerLine.list.splice(key, 1)
      }
      this.RulerLine.key = null
    },
    RulerLineMousedown(index, {isLevel}) {
      this.RulerLine.key = index
      this.RulerMousemove(index, isLevel)
    },
    RulerMousemove(index, isLevel) {
      const {x: domX, y: domY} = this.ClientRects
      document.onmousemove = ({x: windowX, y: windowY}) => {
        [windowX, windowY] = [windowX - domX, windowY - domY]
        this.RulerLine.list[index].distance = !isLevel ? windowX : windowY
      }
    },
    RulerItemMousedown({direction}) {
      this.onMousemove = document.onmousemove; // 拷贝系统方法
      const isLevel = ['top', 'bottom'].includes(direction);
      this.RulerLine.key = this.RulerLine.list.length; // 获取当前key
      this.RulerLine.list.push({isLevel, distance: 0}) // 添加线
      this.RulerMousemove(this.RulerLine.key, isLevel) // 移动实现
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.ClientRects = this.$refs.Ruler.getClientRects()[0]
      })
    })
  }
}
</script>
<style lang="less">
@import "./Ruler.less";
</style>
