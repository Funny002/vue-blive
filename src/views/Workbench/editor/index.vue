<template>
  <div class="WorkbenchEditor">
    <ruler>
      <div class="WorkbenchEditor-body" :style="{'top':RulerMobile.top+'px',left:RulerMobile.left+'px'}" @mousedown.stop>
        WorkbenchEditor
      </div>
    </ruler>
    <side-virtue></side-virtue>
    <vs-code></vs-code>
  </div>
</template>
<script lang="ts">
import {Getter} from "vuex-class";
import {Component, Vue} from 'vue-property-decorator'
//
import {rulerMobile} from "@/store/interface";
import Ruler from "@/components/Ruler/Ruler.vue";
import VsCode from "@/components/codeEdit/Index.vue";
import SideVirtue from '@/components/sideVirtue/Index.vue';

@Component({
  components: {Ruler, VsCode, SideVirtue}
})
export default class WorkbenchEditor extends Vue {
  @Getter('Expand/getRulerMobile') RulerMobile?: rulerMobile

  activated() {
    this.$emit('is-editor', true)
  }

  mounted() {
    this.$emit('is-editor', true)
  }
}
</script>
<style scoped lang="scss">
.WorkbenchEditor-body {
  width: 856px;
  height: 230px;
  overflow: auto;
  border: 1px solid #59f;
  box-sizing: content-box;
  background-color: rgba(255, 255, 255, .2);
}
</style>
