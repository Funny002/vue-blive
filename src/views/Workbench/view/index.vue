<template>
  <div class="">
    workbench-view
  </div>
</template>

<script>
export default {
  name: "workbench-view",
  methods: {
    //
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('menuShow', false)
    })
  }
}
</script>
