<template>
  <div :class="classes" style="height: 0 !important; width: 0 !important">
    <ruler-line-item v-for="(line, key) in data" :key="key" :level="line.level" :distance="line.distance" @mouseup="(event) => onMouseup(key, event)" @mousedown="(event) => onMousedown(key, event)"/>
  </div>
</template>
<script lang="ts">
import {RulerLineArray} from "./verifyRules";
import {Component, Prop, Vue} from "vue-property-decorator";
//
import RulerLineItem from "./ruler-line-item.vue";

@Component({components: {RulerLineItem}})
export default class RulerLine extends Vue {
  @Prop({default: () => []}) data?: RulerLineArray;

  get classes(): string[] {
    return ["ruler-line"];
  }

  onMouseup(key: number, event: MouseEvent): void {
    this.data && this.$emit("mouseup", key, this.data[key], event);
  }

  onMousedown(key: number, event: MouseEvent): void {
    this.data && this.$emit("mousedown", key, this.data[key], event);
  }
}
</script>
