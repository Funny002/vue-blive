<template>
  <div class="RulerLine">
    <ruler-line-list
        :key="key"
        :is-level="item.isLevel"
        :distance="item.distance"
        @mouseup="lineMouseup(key)"
        v-for="(item,key) in RulerLine"
        @mousedown="lineMousedown(key)"
    />
  </div>
</template>

<script>
import RulerLineList from "@/components/Ruler/RulerLineList";

export default {
  name: "ruler-line",
  props: ['RulerLine'],
  components: {'ruler-line-list': RulerLineList},
  data: function () {
    return {
      classes: "RulerLine",
    }
  },
  methods: {
    lineMouseup(key) {
      this.$emit('mouseup', key, this.RulerLine[key])
    },
    lineMousedown(key) {
      this.$emit('mousedown', key, this.RulerLine[key])
    }
  }
}
</script>
