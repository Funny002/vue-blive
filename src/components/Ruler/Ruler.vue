<template>
  <div class="Ruler" ref="Ruler" :style="{'background-image': `url('${RulerBack}')`}">
    <ruler-item type="top" size="small"/>
    <ruler-item type="right" size="small"/>
    <div class="Ruler-body">
      <slot/>
    </div>
  </div>
</template>

<script>
import RulerItem from './RulerItem.vue'

export default {
  name: "Ruler",
  components: {'ruler-item': RulerItem},
  data: function () {
    return {
      RulerBack: require('../../assets/image/RulerBack.jpg')
      //
    }
  }
}
</script>
<style lang="less">
@import "./Ruler.less";
</style>
