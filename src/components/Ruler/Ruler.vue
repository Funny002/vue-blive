<template>
  <div ref="Ruler" :class="classes" @mouseup="RulerMouseup" :style="{'background-image': `url('${RulerBack}')`}">
    <template v-if="isShow">
      <ruler-item type="top" :mobile="RulerItem.mobile.top" @mousedown="RulerItemMousedown"/>
      <ruler-item type="left" :mobile="RulerItem.mobile.left" @mousedown="RulerItemMousedown"/>
      <ruler-line @mouseup="RulerLineMouseup" :ruler-line="RulerLine.list" @mousedown="RulerLineMousedown"/>
    </template>
    <div class="Ruler-body">
      <slot/>
    </div>
  </div>
</template>

<script>
const classes = 'Ruler'
import {mapGetters} from 'vuex'
import RulerItem from './RulerItem.vue'
import RulerLine from './RulerLine.vue'

export default {
  name: "Ruler",
  components: {'ruler-item': RulerItem, 'ruler-line': RulerLine},
  data: function () {
    return {
      RulerItem: {
        mobile: {top: 0, left: 0},
      },
      ClientRects: null, // 参考线距离纠正
      onMousemove: null, // window onmousemove方法保存
      RulerLine: {list: [], key: null},
      RulerBack: require('../../assets/image/RulerBack.jpg')
    }
  },
  computed: {
    ...mapGetters('Ruler', {
      'isShow': "getShow",
    }),
    classes() {
      return [classes]
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
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding-top: 150px;
    padding-left: 150px;
    box-sizing: border-box;
  }
}
</style>
