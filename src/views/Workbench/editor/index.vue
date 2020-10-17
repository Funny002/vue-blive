<template>
  <ruler>
    <div class="WorkbenchEditor" :style="{'top':RulerMobile.top+'px',left:RulerMobile.left+'px'}">
      WorkbenchEditor
    </div>
  </ruler>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Ruler from "@/components/Ruler/Ruler.vue";
import {Getter} from "vuex-class";
import {rulerMobile} from "@/store/interface";

@Component({
  components: {Ruler}
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
//
</style>
