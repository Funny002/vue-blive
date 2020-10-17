<template>
  <div id="Ruler" ref="Ruler" @mouseup="RulerLineMouseup" :style="{'background-image': `url('${RulerBack}')`}">
    <template v-if="isShow">
      <ruler-item type="top" :mobile="RulerMobile.left" @ruler-item-click="rulerItemClick"/>
      <ruler-item type="left" :mobile="RulerMobile.top" @ruler-item-click="rulerItemClick"/>
      <ruler-line :ruler-line="RulerLine.list" @mousedown="RulerLineMousedown" @mouseup="RulerLineMouseup"/>
    </template>
    <RulerBody>
      <slot/>
    </RulerBody>
  </div>
</template>
<script lang="ts">
import {Getter} from "vuex-class";
import {rulerMobile} from "@/store/interface";
import {Component, Vue} from 'vue-property-decorator'
//
import RulerLine from "./RulerLine.vue";
import RulerItem from "./RulerItem.vue";
import RulerBody from "@/components/Ruler/RulerBody.vue";

@Component({
  components: {RulerBody, RulerItem, RulerLine}
})
export default class Ruler extends Vue {
  @Getter('Expand/getRuler') isShow?: boolean;
  @Getter('Expand/getRulerMobile') RulerMobile?: rulerMobile

  //
  RulerBack = require('../../assets/image/RulerBack.jpg');
  onMousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null = null;
  RulerLine: { keys: number | null; list: { isLevel: boolean; distance: number }[] } = {keys: null, list: [{isLevel: true, distance: 150}, {isLevel: false, distance: 150}]};

  /** 移动方法
   * @param index number
   * @param isLevel boolean
   * @constructor
   */
  RulerMousemove(index: number, isLevel: boolean) {
    document.onmousemove = ({x: windowX, y: windowY}) => {
      this.RulerLine.list[index].distance = !isLevel ? windowX - 18 : windowY
    }
  }

  /** 标尺 - 鼠标按下
   * @param rulerLine rulerLine
   */
  rulerItemClick(rulerLine: { isLevel: boolean; distance: number }) {
    const keys = this.RulerLine.list.length
    this.RulerLine.list.push(rulerLine)
    this.RulerLineMousedown(keys, rulerLine)
  }

  /** 线 - 鼠标弹起
   * @constructor
   */
  RulerLineMouseup(): void {
    document.onmousemove = this.onMousemove;
    // 还原
    const {keys, list} = this.RulerLine
    if (keys !== null && list[keys].distance <= 16) {
      this.RulerLine.list.splice(keys, 1)
    }
    this.RulerLine.keys = null
  }

  /** 线 - 鼠标按下
   * @param index number
   * @param isLevel boolean
   * @constructor
   */
  RulerLineMousedown(index: number, {isLevel}: { isLevel: boolean; distance: number }): void {
    this.onMousemove = document.onmousemove
    // 保存
    this.RulerLine.keys = index // 索引
    this.RulerMousemove(index, isLevel) // 公共方法
  }
}
</script>
<style scoped lang="scss">
#Ruler {
  top: 0;
  left: 18px;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background-size: 1%;
  width: calc(100vw - 18px);
  background-color: #5a5757;

  &:before {
    top: 0;
    left: 0;
    width: 100%;
    content: '';
    height: 100%;
    position: absolute;
    background-color: rgba(169, 169, 169, 0.8);
  }
}
</style>
