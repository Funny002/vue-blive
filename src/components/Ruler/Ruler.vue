<template>
  <div ref="Ruler" :class="classes" @mouseup="RulerMouseup" :style="{'background-image': `url('${RulerBack}')`}">
    <ruler-item type="top" :mobile="RulerItem.mobile.top" @mousedown="RulerItemMousedown"/>
    <ruler-item type="left" :mobile="RulerItem.mobile.left" @mousedown="RulerItemMousedown"/>
    <ruler-line @mouseup="RulerLineMouseup" :ruler-line="RulerLine.list" @mousedown="RulerLineMousedown"/>
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
      Ruler: {
        show: false,
      },
      RulerItem: {
        mobile: {top: 0, left: 0},
      },
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
    RulerItemMousedown({isLevel}) {
      this.onMousemove = document.onmousemove; // 拷贝系统方法
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
.Ruler {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background-size: 1%;
  background-color: #5a5757;

  &:before {
    top: 0;
    left: 0;
    width: 100%;
    content: '';
    height: 100%;
    position: absolute;
    background-color: rgba(169, 169, 169, 0.7);
  }

  &-body {
    top: 0;
    left: 0;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;

    &-small {
      margin-top: 16px;
      margin-left: 16px;
      width: calc(100% - 16px);
      height: calc(100% - 16px);
      padding-top: calc(150px - 16px);
      padding-left: calc(150px - 16px);
    }

    &-normal {
      margin-top: 25px;
      margin-left: 25px;
      width: calc(100% - 25px);
      height: calc(100% - 25px);
      padding-top: calc(150px - 25px);
      padding-left: calc(150px - 25px);
    }
  }
}
</style>
