<template>
  <div class="WorkbenchEditor">
    <ruler>
      <div :style="{'top':RulerMobile.top+'px',left:RulerMobile.left+'px'}">
        WorkbenchEditor
      </div>
    </ruler>
    <vs-code/>
  </div>
</template>
<script lang="ts">
import {Getter} from "vuex-class";
import {Component, Vue} from 'vue-property-decorator'
//
import {rulerMobile} from "@/store/interface";
import Ruler from "@/components/Ruler/Ruler.vue";
import VsCode from "@/components/vsCode/Index.vue";

@Component({
  components: {Ruler, VsCode}
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

</style>
