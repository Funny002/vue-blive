<template>
  <div class="vsCode" :class="{'vsCode-show':vsCodeShow}">
    <div class="vsCode-bar" @dblclick="barDblclick">vsCode - view</div>
    <div class="vsCode-body" :style="{'height':vsCodeHeight+'px'}">
      <div class="">
        <div @dblclick="barDblclick"> vsCode-body</div>
      </div>
      <div class="container">
        <div class="container-left">
          container-left
        </div>
        <div class="container-right">
          container-right
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class VsCode extends Vue {
  vsCodeShow = false;
  vsCodeHeight = 500;

  barDblclick() {
    this.vsCodeShow = !this.vsCodeShow
  }
}
</script>
<style scoped lang="scss">
@import "./style.scss";
</style>
