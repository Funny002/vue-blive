<template>
  <div class="editor">
    workbench-editor
  </div>
</template>

<script>
export default {
  name: "workbench-editor",
  props: ['uuid'],
  methods: {
    //
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('menuShow', true)
    })
  }
}
</script>
