<template>
  <div class="sideVirtue">
    <div class="sideVirtue-nav">
      <div class="sideVirtue-nav-item">属性</div>
      <div class="sideVirtue-nav-item">属性</div>
      <div class="sideVirtue-nav-item">属性</div>
    </div>
    <div class="sideVirtue-body">
      sideVirtue
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class SideVirtue extends Vue {
  //
}
</script>
<style scoped lang="scss">
@import "./style.scss";
</style>
