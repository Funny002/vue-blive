<template>
  <div class="codeEdit" :class="{'codeEdit-show':vsCodeShow}">
    <div class="codeEdit-bar" @dblclick="barDblclick">codeEdit</div>
    <div class="codeEdit-body" :style="{'height':vsCodeHeight+'px'}">
      <div>
        <div @dblclick="barDblclick"> vsCode-body</div>
      </div>
      <div class="codeEdit-container">
        container
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class CodeEdit extends Vue {
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
