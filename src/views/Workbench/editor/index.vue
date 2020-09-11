<template>
  <Ruler>
    <div ref="editor" class="editor">
      <component :is="template"/>
    </div>
  </Ruler>
</template>

<script>
import Ruler from "@/components/Ruler/Ruler";

export default {
  name: "workbench-editor",
  components: {Ruler},
  props: ['uuid'],
  data: function () {
    return {
      template: null,
    }
  },
  methods: {
    //
  },
  mounted() {
    !this.uuid && this.$router.push('/workbench')
    this.$nextTick(() => {
      this.$emit('menuShow', true)
    })
  }
}
</script>
