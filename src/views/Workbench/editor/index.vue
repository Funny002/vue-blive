<template>
  <Ruler class="editor">
    workbench-editor
  </Ruler>
</template>

<script>
import {getUuid} from "@/utils/uuid";
import Ruler from "@/components/Ruler/Ruler";

export default {
  name: "workbench-editor",
  components: {Ruler},
  props: ['uuid'],
  methods: {
    //
  },
  mounted() {
    console.log(getUuid())
    this.$nextTick(() => {
      this.$emit('menuShow', true)
    })
  }
}
</script>
