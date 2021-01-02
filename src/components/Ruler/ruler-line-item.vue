<template>
  <div :class="classes" :style="style" @mouseup="onMouseup" @mousedown="onMousedown"/>
</template>
<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class RulerLineItem extends Vue {
  @Prop({default: 0}) distance?: number;
  @Prop({default: false}) level?: boolean;

  get classes(): string[] {
    return ["ruler-line-item", this.level ? "ruler-line-item-top" : "ruler-line-item-left"];
  }

  get style(): { [key: string]: string } {
    const {level, distance} = this;
    return {[level ? "top" : "left"]: distance + "px"};
  }

  onMouseup(event: MouseEvent): void {
    this.$emit("mouseup", event);
  }

  onMousedown(event: MouseEvent): void {
    this.$emit("mousedown", event);
  }
}
</script>
<style scoped lang="scss">
.ruler-line-item {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  position: absolute;
  background-color: #ffffff;

  &:hover {
    z-index: 300;
    background-color: #ff86b2;
  }

  &-top {
    height: 1px !important;
  }

  &-left {
    width: 1px !important;
  }
}
</style>
