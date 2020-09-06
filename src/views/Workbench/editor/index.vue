<template>
  <div>
    workbench-editor
  </div>
</template>

<script>
export default {
  name: "workbench-editor",
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
